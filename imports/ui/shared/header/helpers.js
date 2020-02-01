import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Router } from 'meteor/iron:router'

import { getSetting } from '../../../modules/management/both/settings'
import { Teams } from '/imports/modules/teams/both/collection'
import { checkRole } from '/imports/helpers/both/roles'
import { isMember, isAdmin } from '../../../modules/_common/both/teams'

Template.appHeader.helpers({
  siteName: () => {
    return getSetting('siteSettings', 'title') || ''
  },
  allowTeamCreation: () => {
    return getSetting('teamsCreation', 'creationPermissions') === 'public' ||
      checkRole(Meteor.userId(), 'super-admin')
  },
  allowTeamSettings: () => {
    return isAdmin(Meteor.userId(), Session.get('lastTeamId'))
  },
  'teams': () => {
    return Teams.find()
  },
})

Template.appHeaderTeam.helpers({
  'activeTeam': (template) => {
    return template.data._id === Session.get('lastTeamId')
  }
})
