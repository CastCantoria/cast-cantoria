<script setup>
import { ref, onMounted } from "vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { useAuth } from "../composables/useAuth"
import { fetchGalleryImages } from "../composables/useGallery"
import { uploadFileAndGetURL } from "../composables/useStorage"

const { user, role } = useAuth()

const images = ref([])
const loadingImages = ref(true)

onMounted(async () => {
  const urls = await fetchGalleryImages()
  images.value = urls.map(url => ({
    src: url,
    caption: "Image de la galerie"
  }))
  loadingImages.value = false
})

const videos = [
  { src: "/assets/video/message-spirituel.mp4", caption: "La parole de Dieu est vivante et efficace." },
  { src: "/assets/video/presentation-cast.mp4", caption: "Allez, faites de toutes les nations des disciples." }
]

const audios = [
  { src: "/assets/audio/cantique-1.mp3", caption: "Chantez à Dieu, chantez à notre Roi." },
  { src: "/assets/audio/intro-cast.mp3", caption: "Entrez dans ses portes avec des chants de louange." },
  { src: "/assets/audio/hallelujah.mp3", caption: "Saint, saint, saint est l'Éternel des armées." }
]

const showAllImages = ref(false)
const showAllVideos = ref(false)
const showAllAudios = ref(false)

const limitImages = 6
const limitVideos = 1
const limitAudios = 1

const envoyerCommentaire = () => {
  alert("Commentaire envoyé (fonction à compléter)")
}

const uploadGalleryImage = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) return

  const path = `galerie/${Date.now()}-${file.name}`
  try {
    const url = await uploadFileAndGetURL(file, path)
    images.value.unshift({
      src: url,
      caption: "Ajouté par " + (user.value.email || "un membre")
    })
    alert("Image envoyée avec succès.")
  } catch (error) {
    alert("Erreur lors de l’envoi : " + error.message)
  }
}
</script>