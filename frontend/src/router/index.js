import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useAuthStore } from '@/stores/authStore'

// 🌐 Vues publiques
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Pedagogie from '@/views/Pedagogie.vue'
import Concerts from '@/views/Concerts.vue'
import Spiritualite from '@/views/Spiritualite.vue'
import Galerie from '@/views/Galerie.vue'
import Contact from '@/views/Contact.vue'
import Profile from '@/views/Profile.vue'
import Messages from '@/views/Messages.vue'
import NotFound from '@/views/NotFound.vue'

// 🛠️ Layout et vues admin
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminMembers from '@/views/admin/AdminMembers.vue'
import AdminMediaPanel from '@/views/admin/AdminMediaPanel.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/pedagogie', component: Pedagogie },
  { path: '/concerts', component: Concerts },
  { path: '/spiritualite', component: Spiritualite },
  { path: '/galerie', component: Galerie },
  { path: '/contact', component: Contact },
  { path: '/profile', component: Profile },
  { path: '/messages', component: Messages },

  // 🔐 Déconnexion
  {
    path: '/logout',
    beforeEnter: async (to, from, next) => {
      const store = useAuthStore()
      const auth = getAuth()

      store.setToken(null)
      store.setUser(null)
      await auth.signOut()

      next('/')
    }
  },

  // 🔐 Routes admin protégées
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'membres', component: AdminMembers },
      { path: 'media', component: AdminMediaPanel }
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Middleware admin
router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const db = getFirestore()
  const store = useAuthStore()
  const currentUser = auth.currentUser

  if (to.meta.requiresAdmin) {
    if (!currentUser) return next('/')

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (!userDoc.exists()) return next('/')

      const userData = userDoc.data()
      const isAdminFlag = userData.role === 'admin'

      store.setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        isAdmin: isAdminFlag
      })

      store.setToken(await currentUser.getIdToken())

      return isAdminFlag ? next() : next('/')
    } catch (error) {
      console.error('🔐 Erreur admin :', error)
      return next('/')
    }
  }

  next()
})

export default router