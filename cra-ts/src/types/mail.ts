import { IErrorType } from './error';

// ----------------------------------------------------------------------

export type IMailLabel = {
  id: string;
  type: string;
  name: string;
  color: string;
  unreadCount?: number;
};

export type IMailSender = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type IMailAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type IMail = {
  id: string;
  labelIds: string[];
  folder: string | undefined;
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  subject: string;
  message: string;
  createdAt: Date | string | number;
  attachments: IMailAttachment[];
  from: IMailSender;
  to: IMailSender[];
};

// ----------------------------------------------------------------------

export type IMailListState = {
  byId: Record<string, IMail>;
  allIds: string[];
};

export type IMailState = {
  mails: IMailListState;
  labels: IMailLabel[];
  labelsStatus: {
    loading: boolean;
    empty: boolean;
    error: IErrorType;
  };
  mailsStatus: {
    loading: boolean;
    empty: boolean;
    error: IErrorType;
  };
};
