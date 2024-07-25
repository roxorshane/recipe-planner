import { ingredientDatabase } from 'data/static';
import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor, Transforms, Range, createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
} from 'slate-react';
import classnames from 'classnames';
import styles from './FormulaInput.module.scss';

const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
};

const FormulaInput = ({ onChange, placeholderText, className }) => {
  const ref = useRef()
  const [target, setTarget] = useState()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  )

  const ingredientNames = ingredientDatabase.filter(ingredient =>
    ingredient.name.toLowerCase().startsWith(search.toLowerCase())
  ).map(ingredient => ingredient.name);

  const onKeyDown = useCallback(
    event => {
      if (target && ingredientNames.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= ingredientNames.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? ingredientNames.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, ingredientNames[index])
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
          default:
        }
      }
    },
    [ingredientNames, editor, index, target]
  )

  useEffect(() => {
    if (target && ingredientNames.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [ingredientNames.length, editor, index, search, target])

  const fireOnChangeCallback = (editorValue) => {
    const plainTextValue = 
        // Return the string content of each paragraph in the value's children.
        editorValue.map(n => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join('\n');
    onChange && onChange(plainTextValue);
  };

  return <div className={classnames(styles.FormulaInputContainer, className)}>
    <Slate
      editor={editor}
      initialValue={[{
        type: 'paragraph',
        children: [{ text: '' }]
      }]}
      onChange={(value) => {
        onChange && fireOnChangeCallback(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection)
          const wordBefore = Editor.before(editor, start, { unit: 'word' })
          const before = wordBefore && Editor.before(editor, wordBefore)
          const beforeRange = before && Editor.range(editor, before, start)
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^ (\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange)
            setSearch(beforeMatch[1])
            setIndex(0)
            return
          }
        }

        setTarget(null)
      }}
    >
      <Editable
        className={styles.FormulaInputEditable}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        placeholder={placeholderText || "Enter some text..."}
        renderPlaceholder={({ children, attributes }) => (
          <div className={styles.Placeholder} {...attributes}>
            {children}
          </div>
        )}
      />
      {target && ingredientNames.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: '-9999px',
              left: '-9999px',
              position: 'absolute',
              zIndex: 1,
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 5px rgba(0,0,0,.2)',
            }}
            data-cy="mentions-portal"
          >
            {ingredientNames.map((ingredientName, i) => (
              <div
                key={ingredientName}
                onClick={() => {
                  Transforms.select(editor, target)
                  insertMention(editor, ingredientName)
                  setTarget(null)
                }}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  background: i === index ? '#B4D5FF' : 'transparent',
                }}
              >
                {ingredientName}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  </div>
}

const withMentions = editor => {
  const { isInline, isVoid, markableVoid } = editor

  editor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  editor.markableVoid = element => {
    return element.type === 'mention' || markableVoid(element)
  }

  return editor
}

const insertMention = (editor, ingredientName) => {
  const mention = {
    type: 'mention',
    ingredientName,
    children: [{ text: ' ' + ingredientName }],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const Element = props => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const style = {
    padding: '3px 3px 2px',
    margin: '0 4px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: '#eee',
    fontSize: '1em',
    boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
  }
  // See if our empty text child has any styling marks applied and apply those
  if (element.children[0].bold) {
    style.fontWeight = 'bold'
  }
  if (element.children[0].italic) {
    style.fontStyle = 'italic'
  }
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.ingredientName.replace(' ', '-')}`}
      style={style}
    >
      {element.ingredientName}
      {children}
    </span>
  )
}

export {
  FormulaInput
};
export default FormulaInput;

