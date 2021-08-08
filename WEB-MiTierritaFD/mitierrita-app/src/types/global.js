import namespace from '@/utils/namespace';

export default namespace('global', {
  actions: [
    'changeLanguage',
    'toggleable'
  ],
  getters: [
    'processing',
    'language',
    'toggle'
  ],
  mutations: [
    'startProcessing',
    'stopProcessing',
    'setLanguage',
    'setToggleable'
  ]
});
