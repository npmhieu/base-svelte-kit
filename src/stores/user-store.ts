import {derived, get, readable, writable} from 'svelte/store';
import type {Writable} from 'svelte/store';
import {kitApi} from '@core/variables.ts';
import {TAB_MAPPING} from '@utils/search.util.js';
import type {IUserStore, IUserStoreProps} from "@core/models";
import {Candidate} from "@core/models";



function enhanceUserStore(userStore: Writable<IUserStoreProps>): IUserStore {
    const downloadFile = (file, filename) => {
        // var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            let a = document.createElement("a"),
              url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    

    const {set, update, subscribe} = userStore;
    let _userStore: IUserStoreProps;
    subscribe(v => {
        _userStore = v;
    });
    const currentUser$ = readable<Candidate>(null, (set) => {
        subscribe(v => set(v.currentUser));
        return () => null;
    });

    /* Helper functions */
    const formatFileName = (name = new Date().getTime().toString()) => name
        .trim().toLowerCase().replace(/ /g, '-').replace(/[/\\?%*:|"<>]/g, '');

    const getFileExtension = (blob: Blob | string): string => {
        const detectedExtension = {
            'application/msword': 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessing': 'docx',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'application/pdf': 'pdf'
        }[(blob as Blob).type];
        return detectedExtension || 'doc';
    }

    /* End Helper functions */



    const reloadUserDetail = async (userId) => {
        const candidate = new Candidate(await fetch(`/api/candidate/${userId}.json`).then(rs => rs.json()));
        update((storeVal) => {
            storeVal.users[candidate.userId] = candidate;
            if (storeVal.currentUser?.userId === candidate.userId) {
                storeVal.currentUser = candidate;
            }
            return storeVal;
        })
    }

    const exportCandidateCV = (userId) => {
        const user: Candidate = _userStore.users[userId];
        if (!user || !user.exportableCVData || user.cvError) {
            return;
        }
        downloadFile(user.exportableCVData, formatFileName(`${user.fullName}.pdf`));
    }

    const exportCandidateCVByData = (userId) => {
        const user: Candidate = _userStore.users[userId];
        if (!user) {
            return;
        }
        downloadFile(user.exportableCVData, formatFileName(`${user.fullName}.pdf`));
    }

    const purchaseContact = async (userId) => {
        const user = _userStore.users[userId];
        if (!user) {
            return false;
        }
        const {
            data,
            error
        } = await fetch(`/api/candidate/${userId}/purchase`, {method: 'PUT'}).then(response => response.json());
        if (error) {
            return false;
        }
        user.isPaid = true;
        update((storeVal) => {
            storeVal.users[userId] = user;
            return storeVal;
        });
        await reloadUserDetail(userId);
        return true;
    };

    return {
        subscribe,
        setCurrentUser: (target) => {
            update(storeVal => {
                if (typeof target === 'string' && storeVal.users[target]) {
                    storeVal.currentUser = storeVal.users[target];
                }
                if (target['userId']) {
                    storeVal.currentUser = target as Candidate;
                    storeVal.users[target['userId']] = target as Candidate;
                }
                return storeVal;
            });
        },
        markCandidateCVAsError: (userId) => {
            const user: Candidate = _userStore.users[userId];
            if (!user || !user.haveCV || !user.viewableCvData || !user.exportableCVData) {
                return;
            }
            user.markCVError(true);
            update(storeVal => {
                storeVal.users[user.userId] = user;
                return storeVal;
            });
        },
        getCandidateCV: async (userId, forceReload?) => {
            const user: Candidate = _userStore.users[userId];

            if (!user || !user.viewableCvData || forceReload) {
                try {
                    const cvContent = (await fetch(`/api/candidate/${userId}/resume`).then(response => response.json())).content;
                    if (user) {
                        user.setCVContent(cvContent);
                        update(storeVal => {
                            storeVal.users[user.userId] = user;
                            return storeVal;
                        });
                        return user.viewableCvData;
                    } else {
                        return cvContent ? Candidate.decodeRawCV(cvContent) : null;
                    }
                } catch (e) {
                    if (user) {
                        user.setCVContent();
                        update(storeVal => {
                            storeVal.users[user.userId] = user;
                            return storeVal;
                        });
                        return user.viewableCvData;
                    }
                    return null;
                }
            }
            return user ? user.viewableCvData : null;
        },
        purchaseContact,
        reloadUserDetail,
        currentUser$,
        exportCandidateCV
    }
}

export const userStore = writable<IUserStoreProps>({
    users: {},
    selectedId: null,
});


export const enhancedUserStore = enhanceUserStore(userStore);

export const currentUser = derived<Writable<IUserStoreProps>, Candidate | any>(
    userStore,
    ($userStore) => $userStore.users[$userStore.selectedId]);

export const selectedTab = writable(1);

export const selectedUser = writable(null);
export const profile = writable({});
export const resume = writable(null);
export const resumeUrl = writable(null);
export const activity = writable(null);
export const application = writable(null);
export const note = writable(null);

export const purchaseUserInfo = async function () {
    const user = get(currentUser);
    if (!user) {
        return;
    }


    const url = `${kitApi.candidate}/${user.userId}/purchase`;
    const res = await fetch(url, {
        method: 'PUT'
    });
    const {data, error} = await res.json();
    if(error){
        return false;
    }


    selectedUser.update(state => {
        state.isPaid = true;
        return state;
    });

    await loadUserDetail();
    await loadUserTab();

    return true;

};

export const loadUserDetail = async function () {
    const user = get(currentUser);
    if (!user) {
        return;
    }

    const url = `${kitApi.candidate}/${user.userId}`;

    const res = await fetch(url);
    const {data, error} = await res.json();
    if (error) {
        // TODO show error message
        return;
    }
    selectedUser.set(data);
};

export const loadUserTab = async function () {
    const user = get(currentUser);
    if (!user) {
        return;
    }
    const activeTab = get(selectedTab);

    const currentTab = TAB_MAPPING[activeTab] ? TAB_MAPPING[activeTab] : TAB_MAPPING[1];
    const url = `${kitApi.candidate}/${user.userId}/${currentTab}`;


    const res = await fetch(url);
    const {data, error} = await res.json();

    if (error) {
        // TODO show error message
        return;
    }

    // set data to tabs
    switch (activeTab) {
        case 1:
            profile.set(data);
            break;
        case 2:

            resume.set(data);
            if (data.length > 0) {
                let {fileUrl} = data[0];
                console.log(fileUrl);
                resumeUrl.set(fileUrl + '?t=' + Math.floor(Date.now() / 1000));
            } else {
                selectedUser.update(state => {
                    state.haveCV = false;
                    return state;
                });
                resumeUrl.set(null);
            }

            break;
        case 3:
            activity.set(data);
            break;
        case 4:
            application.set(data);
            break;
        case 5:
            note.set(data);
            break;
    }
}