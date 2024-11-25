<template>
    <div class="form-container">
      <form class="main-form">
        <h2>Create Article</h2>
        
        <div class="form-grid">
          <div class="form-group">
            <label for="company">Related Company *</label>
            <select
              id="company"
              v-model="formData.company"
              required
              class="form-input"
            >
              <option value="">Select Company</option>
              <option 
                v-for="company in companies" 
                :key="company._id" 
                :value="company._id"
              >
                {{ company.name }}
              </option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="title">Title *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="link">Link *</label>
            <input
              id="link"
              v-model="formData.link"
              type="url"
              required
              placeholder="https://"
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="date">Date *</label>
            <input
              id="date"
              v-model="formData.date"
              type="date"
              required
              class="form-input"
            />
          </div>
  
          <div class="form-group full-width">
            <label for="image">Image *</label>
            <div class="image-upload-container">
              <input
                id="image"
                type="file"
                @change="handleImageChange"
                accept="image/*"
                required
                class="image-input"
              />
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="Preview" />
                <button 
                  type="button" 
                  @click="clearImage" 
                  class="clear-image"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
  
          <div class="form-group full-width">
            <label>Content *</label>
            <div class="editor-container">
              <!-- <editor-content :editor="editor" /> -->
              <div v-if="editor" class="container">
                <div class="control-group">
                  <div class="button-group">
                    <button @click.prevent="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                      Bold
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                      Italic
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                      Strike
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                      Code
                    </button>
                    <button @click.prevent="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                      Paragraph
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                      H1
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                      H2
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                      H3
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                      H4
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                      H5
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                      H6
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                      Bullet list
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                      Ordered list
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                      Code block
                    </button>
                    <button @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                      Blockquote
                    </button>
                    <button @click.prevent="editor.chain().focus().setHorizontalRule().run()">
                      Horizontal rule
                    </button>
                    <button @click.prevent="editor.chain().focus().setHardBreak().run()">
                      Hard break
                    </button>
                  </div>
                </div>
                <editor-content :editor="editor" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="button-container">
          <button type="submit" @click.prevent="handleSubmit" class="submit-button">Save Article</button>
        </div>
      </form>
    </div>
</template>
  
<script setup>
  import api from '../plugins/axios'
  import axios from 'axios'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'

  const router = useRouter()
  
  const companies = ref([])
  
  const formData = ref({
    company: '',
    title: '',
    link: '',
    date: new Date().toISOString().split('T')[0], 
    image: null,
    content: ''
  })
  
  const imagePreview = ref(null)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      formData.value.content = editor.getHTML()
    }
  })
  
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      formData.value.image = file
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const clearImage = () => {
    formData.value.image = null
    imagePreview.value = null
    const input = document.getElementById('image')
    if (input) input.value = ''
  }

  const handleUpload = async () => {
    let resp = await api.get('/file/upload')
    console.log('S3', resp)

    await axios.put(resp.data.url, formData.value.image, {
      headers: {
        'Content-Type': formData.value.image.type
      }
    })

    const userId = localStorage.getItem('userId')
    const userType = localStorage.getItem('userType')

    const bucketURL = import.meta.env.VITE_S3_BUCKET_URL

    const payload = {
      ...formData.value,
      writer: userType === 'Writer' ? userId : null,
      editor: userType === 'Editor' ? userId : null,
      image: `${bucketURL}${resp.data.key}`
    }

    await api.post('/article', payload)
    router.push('/articles')
  }
  
  const handleSubmit = async () => {
    await handleUpload()
  }

  const fetchAllCompanies = async () => {
    const response = await api.get('/company')
    companies.value = response.data.companies
  }

  onMounted(() => {
    fetchAllCompanies()
  })
  
  onBeforeUnmount(() => {
    editor.value.destroy()
  })
</script>
  
<style scoped>
  .form-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 1rem;
    background-color: #f5f5f5;
  }
  
  .main-form {
    width: 100%;
    max-width: 70%;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .full-width {
    grid-column: 1 / -1;
  }
  
  .form-group label {
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }
  
  .form-input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  .image-upload-container {
    border: 2px dashed #ddd;
    padding: 1rem;
    border-radius: 4px;
    position: relative;
  }
  
  .image-input {
    width: 100%;
  }
  
  .image-preview {
    margin-top: 1rem;
    position: relative;
    display: inline-block;
  }
  
  .image-preview img {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
  }
  
  .clear-image {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .editor-container {
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  :deep(.ProseMirror) {
    min-height: 200px;
    padding: 1rem;
  }
  
  :deep(.ProseMirror:focus) {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  .button-container {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
  
  .submit-button {
    background-color: #4a90e2;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-button:hover {
    background-color: #357abd;
  }
  
  @media (max-width: 768px) {
    .main-form {
      max-width: 100%;
      padding: 1.5rem;
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .button-container {
      justify-content: center;
    }
  }
</style>