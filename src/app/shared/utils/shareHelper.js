import { Share } from 'react-native';

export const shareUrl = ({
  message,
  url,
  title = '',
  dialogTitle = '',
  subject = '',
}) => {
  Share.share(
    {
      message: message || url,
      title,
      //   url, // iOS only
    },
    {
      dialogTitle, // Android only:
      subject, // iOS only
      //   excludedActivityTypes: excludeApp, // iOS only
    },
  );
};
