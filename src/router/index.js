import Vue from 'vue'
import Router from 'vue-router'
import Meetinator from './../pages/Meetinator.vue'
import MeetingCreator from './../pages/MeetingCreator'
import CreatedMeeting from './../pages/CreatedMeeting'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/meetinator/:meetingId', component: Meetinator, props: true },
        { path: '/meetingcreator', component: MeetingCreator },
        { path: '/meetingcreator/:meetingId', component: CreatedMeeting, props: true, name: 'meetingCreated' }
    ]
})