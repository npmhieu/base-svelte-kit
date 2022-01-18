import type {CurrentPage, ToastType} from '@core/constants';
import {CandidateSource} from "@core/constants";
import type {Readable, Writable} from "svelte/types/runtime/store";
import type * as CSS from 'csstype';
import type {EasingFunction, TransitionConfig} from "svelte/types/runtime/transition";

export interface ICurrentPage {
    currentPage: CurrentPage,
    data?: any, // will be updated with currentPage prop when the setCurrentPage function is called
}


export interface IPageStore extends Partial<Writable<ICurrentPage>> {
    setCurrentPage: (data: ICurrentPage) => void
}

export interface IUserStoreProps {
    users: { [userId: string]: Candidate | any },
    selectedId?: string,
    currentUser?: Candidate
}

export interface IUserStore extends Partial<Readable<IUserStoreProps>> {
    setCurrentUser: (target: string | Candidate) => void,
    reloadUserDetail: (userId: string) => Promise<void>,
    getCandidateCV: (userId: string, forceReload?: boolean) => Promise<void>,
    markCandidateCVAsError: (userId: string) => void,
    purchaseContact: (userId: string) => Promise<boolean>,
    currentUser$: Readable<Candidate>
    exportCandidateCV: (userId: string) => void
}

export interface ModalOption {
    closeButton?: boolean,
    closeOnEsc?: boolean,
    closeOnOuterClick?: boolean,
    styleBg?: CSS.Properties,
    styleWindowWrap?: CSS.Properties,
    styleWindow?: CSS.Properties,
    styleContent?: CSS.Properties,
    styleCloseButton?: CSS.Properties,
    transitionBg?: (node: Element, transitionParam?: TransitionProps) => TransitionConfig,
    transitionBgProps?: TransitionProps,
    transitionWindow?: (node: Element, transitionParam?: TransitionProps) => TransitionConfig,
    transitionWindowProps?: TransitionProps,
    disableFocusTrap?: boolean,
}

export interface TransitionProps {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;

    [props: string]: any
}

export interface ModalCallback {
    onClose?: (...props) => void
}

export interface ModalContext {
    open: (
        Component: any,
        newProps: {
            message?: any,
            onCancel?: (input: string) => void,
            onOkay?: (input: string) => void,
            [props: string]: any
        },
        options?: ModalOption,
        callback?: {
            onOpen?: (event?) => void,
            onOpened?: (event?) => void,
            onClose?: (event?) => void,
            onClosed?: (event?) => void,
        }
    ) => void
}

export interface NotificationStoreItem extends ToastOption {
    id: string,
    message: string,
    type: ToastType
}

export interface ToastOption {
    timeout?: number, // in ms
    icon?: string, // Feather icon name
}

export class Candidate {
    userId: string;
    currentCompanyName: string;
    currentSalary: string;
    currentTitle: string;
    cvDownload?: string;
    cvPreview?: string;
    firstName: string;
    fullName: string;
    haveCV: boolean;
    src: CandidateSource;
    updatedDateTimeStamp: number;
    updatedOn: string;
    email?: string;
    yob: number;
    avatar?: string;
    isPaid: boolean;
    resume?: {credit: number, fileUrl: string}[];
    phoneNumber?: string;
    jobNecessityLevel?: string;
    highestDegreeName?: string;
    experiences?: {
        industries: string[];
        functions: string[];
    };
    notes?: CandidateNote[];
    activities?: CandidateActivity[];
    applications?: CandidateApplication[];
    expectations?: {
        industries: string[];
        locations: string[];
    };
    employmentHistory?: CandidateEmploymentHistory[];
    workingLocation?: string;
    workingLocations?: string[];

    private cvContent?: any;
    private decodedCv?: string;
    private _cvContent?: any;
    private _cvError?: boolean;


    constructor(props) {
        Object.assign(this, props);
        // update haveCV prop if no resume found
        this.resume = (this.resume || []).filter(({fileUrl}) => !!fileUrl);
        if (!this.resume || !this.resume.length) {
            this.haveCV = false;
            this.cvDownload = null;
            this.cvPreview = null;
        }
        this.workingLocation = this.workingLocation || (this.expectations?.locations || this.workingLocations || []).join(', ');
    }

    get isPrimusCandidate(): boolean
    {
        return this.src === CandidateSource.PRIMUS;
    }

    get isVNWCandidate(): boolean
    {
        return this.src === CandidateSource.VNW;
    }

    get isCRMCandidate(): boolean
    {
        return this.src === CandidateSource.CRM;
    }

    get amountOfCreditRequired(): number
    {
        return this.resume[0]?.credit ?? 0;
    }
    get viewableCvData(): any
    {
        return this.decodedCv;
    }

    static decodeRawCV(rawCV): string
    {
        return atob(rawCV);
    }

    get exportableCVData(): any
    {
        return this._cvContent;
    }

    get cvStatus(): string
    {
        switch (this._cvContent) {
            case undefined:
                return 'CV file is not loaded';
            case null:
                return 'CV file not found';
            default:
                return 'CV file is loaded';
        }
    }

    markCVError(isError: boolean): void
    {
        this._cvError = isError;
    }

    get cvError(): boolean
    {
        return !!this._cvError;
    }

    setCVContent(rawCV?): void
    {
        const convertToBlob = (base64str): any => {

            const binary = atob(base64str.replace(/\s/g, ''));
            const len = binary.length;
            const buffer = new ArrayBuffer(len);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }

            return new Blob([view], {type: "application/pdf"});
        }
        this._cvContent = rawCV ? convertToBlob(rawCV) : rawCV;
        this.decodedCv = rawCV ? atob(rawCV) : rawCV;
        this._cvError = !!rawCV;
    }
}

export interface CandidateEmploymentHistory {
    entryId: number;
    userId: number;
    jobTitle: string;
    companyName: string;
    startOn: string; // Nov 2009
    endOn: string; // same
    isCurrent: 0 | 1;
    salary: string;
    jobLevelId: number;
    industries: string[];
    functions: string[];
}

export interface CandidateApplication {
    id: string;
    time: string;
    jobTitle: string;
    subStatus: string;
    overallStage: string;
    primaryRecruiter: string;
    account: string;

}

export interface CandidateActivity {
    id: string,
    time: string,
    name: string,
    subName: string,
    content: string,
    fromStatus: string, // Sendout
    toStatus: string, // '1st Interview/Haken'
    primaryRecruiter: string
}

export interface CandidateProfile {
    userId: string | number;
    email: string;
    fullName?: string;
    avatar?: string;
    phoneNumber?: string;
    jobNecessityLevel?: string;
    highestDegreeName?: string;
    updatedOn: number; // 22 days ago
    experiences: {
        industries: string[];
        functions: string[];
    };
    expectations: {
        industries: string[];
        locations: string[];
    };
    employmentHistory: {
        entryId: number;
        userId: number;
        jobTitle: string;
        companyName: string;
        startOn: string; // Nov 2009
        endOn: string; // same
        isCurrent: 0 | 1;
        salary: string;
        jobLevelId: number;
        industries: string[];
        functions: string[];
    }[]
}

export interface CandidateNote {
    id: number;
    author: string;
    authorRole: string;
    content: string;
    createdOn: string; // 2017-06-21 05:01:19
}

export interface CandidateItemInfo {
    userId: string;
    currentCompanyName: string;
    currentSalary: string;
    currentTitle: string;
    cvDownload: string;
    cvPreview: string;
    firstName: string;
    fullName: string;
    haveCV: boolean;
    src: CandidateSource;
    updatedDateTimeStamp: number;
    updatedOn: string; // "29-11-2021 04:39"
}


export interface IndustryGroup {
    name: string;
    code: number;
    industries?: Industry[];
}

export interface Industry {
    name: string;
    ids: string[];
}

export interface LocationGroup {
    id: number;
    name: string;
    locations: LocationDetail[]
}

export interface LocationDetail {
    id: number;
    name: string;
}

export interface Language {
    id: number;
    name: string;
}

export interface UserStore {
    users: { [userId: string]: Candidate | any },
    selectedId: string
}

export enum UserDetailTab {
    CV = 'cv',
    Profile = 'profile',
    Application = 'application',
    Note = 'note',
    Activity = 'activity'
}
