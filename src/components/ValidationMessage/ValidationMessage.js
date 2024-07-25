import styles from './ValidationMessage.module.scss';

const ValidationMessage = ({ validationErrors }) => {
  if (!validationErrors) { return null; }
  return <div className={styles.ValidationMessageContainer}>
    <div className={styles.ValidationMessageTitle}>
      Error
    </div>
    <div className={styles.ValidationMessageContent}>
      <ul className={styles.ValidationMessageList}>
        {validationErrors.map(error => (
          <li className={styles.ValidationMessageListItem}>
            {error.errorMessage}
          </li>
        ))}
      </ul>
    </div>
  </div>;
};

export {
  ValidationMessage
};
export default ValidationMessage;