import { Template } from 'meteor/templating'
import { Settings } from '/imports/modules/management/both/collection'

Template['management.permissions'].helpers({
  signupsConfig: () => {
    const st = Settings.findOne({ type: 'siteSettings' })
    return st && st.settings ? st.settings : {}
  }
})