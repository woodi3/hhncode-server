import { IPostDocument } from '../database/posts/posts.types';

export enum EmailType {
    NewPost,
    UserRegistration,
    UserSubscription,
    UserAccountDeletion,
    UserUnsubscribe,
    UserAccountChange,
    CommentReport,
    UserDontationReceipt,
}

export interface IEmail {
    from: string;
    to: string;
    title: string;
    body: string;
    post?: IPostDocument;
    type: EmailType;
}

interface IEmailService {
    sendEmail: (email: IEmail) => Promise<boolean>;
}
export default class EmailService implements IEmailService {
    async sendEmail(email: IEmail): Promise<boolean> {
        switch (email.type) {
            case EmailType.NewPost:
                return await this._sendNewPostEmail(email);
            case EmailType.UserRegistration:
                return await this._sendUserRegistrationEmail(email);
            case EmailType.UserSubscription:
                return await this._sendUserSubscriptionEmail(email);
            case EmailType.UserAccountDeletion:
                return await this._sendUserAccountDeletionEmail(email);
            case EmailType.UserAccountChange:
                return await this._sendUserAccountChangeEmail(email);
            case EmailType.UserUnsubscribe:
                return await this._sendUserUnsubscribeEmail(email);
            case EmailType.CommentReport:
                return await this._sendCommentReportEmail(email);
            case EmailType.UserDontationReceipt:
                return await this._sendUserDontationReceiptEmail(email);
            default:
                console.log('IEmail type not defined');
        }
        return false;
    }

    private async _sendNewPostEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendNewPostEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserRegistrationEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserRegistrationEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserSubscriptionEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserSubscriptionEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserAccountDeletionEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserAccountDeletionEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserAccountChangeEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserAccountChangeEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserUnsubscribeEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserUnsubscribeEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendCommentReportEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserUnsubscribeEmail function in EmailService');
            return true;
        }
        return false;
    }

    private async _sendUserDontationReceiptEmail(email: IEmail): Promise<boolean> {
        if (email) {
            console.log('TODO ----');
            console.log('Implement _sendUserDontationReceiptEmail function in EmailService');
            return true;
        }
        return false;
    }
}
