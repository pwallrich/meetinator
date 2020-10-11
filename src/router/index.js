import Vue from 'vue'
import Router from 'vue-router'
import Meetinator from './../components/Meetinator.vue'
import MeetingCreator from './../components/MeetingCreator'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/meetinator/:meetingId', component: Meetinator, props: true },
        { path: '/meetingcreator', component: MeetingCreator }
    ]
})