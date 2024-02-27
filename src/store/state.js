export default {
    page_title: '',
    user: [],
    token: '',
    activeTabs: {},
    components: null,
    languages: null,
    search: null,
    searchLoadingStatus: false,
    navigationLinks: [],
    toggleMenu: false,
    isLoading: false,
    formFields: {},
    messageComponents: {
        flash_message: {},
        hasMessage: false
    },
    redirectComponent: {
        url: '',
        timeout: null,
        hasRedirect: false
    },
    modalData: {},
    modalExportData: {},
    errors: {},
    domain: {
      domain: '',
      domain_image: '',
      domain_link: ''
    },
    notFoundData: {},
    notFoundStatus: false,
    shouldSyncSeoValues: false,
    isInDevelopmentMode: process.env.NODE_ENV === 'development'
}
