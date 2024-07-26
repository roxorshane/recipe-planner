import styles from './ValidationMessage.module.scss';

const ValidationMessage = ({ validationErrors }) => {
  if (!validationErrors) { return null; }
  
  return (
    <div className={styles.ValidationMessageContainer}>
      <div className={styles.ValidationMessageTitle}>
        Oh no!
      </div>
      <div className={styles.ValidationMessageContent}>
        <ul className={styles.ValidationMessageList}>
          {validationErrors.map((error, key) => (
            <li className={styles.ValidationMessageListItem} key={key}>
              {error.errorMessage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {
  ValidationMessage
};
export default ValidationMessage;