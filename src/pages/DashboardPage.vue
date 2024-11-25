<template>
    <div class="dashboard">
      <h1>Article Dashboard</h1>
  
      <div class="article-lists">
        <div class="article-list">
          <h2>For Edit</h2>
          <div v-for="article in forEditArticles" :key="article.id" class="article-card">
            <img :src="article.image" alt="Article Image" class="article-image" />
            <div class="article-details">
              <h3>{{ article.title }}</h3>
              <a :href="article.link" target="_blank">Read Article</a>
              <p>Date: {{ article.date }}</p>
              <p>Writer: {{ article.writerName }}</p>
              <p>Editor: {{ article.editorName }}</p>
            </div>
          </div>
        </div>
  
        <div class="article-list">
          <h2>Published</h2>
          <div v-for="article in publishedArticles" :key="article.id" class="article-card">
            <img :src="article.image" alt="Article Image" class="article-image" />
            <div class="article-details">
              <h3>{{ article.title }}</h3>
              <a :href="article.link" target="_blank">Read Article</a>
              <p>Date: {{ article.date }}</p>
              <p>Writer: {{ article.writerName }}</p>
              <p>Editor: {{ article.editorName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import { ref } from 'vue'
  
  export default {
    name: 'App',
    setup() {
      const forEditArticles = ref([
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          title: 'Article 1',
          link: '#',
          date: '2024-11-22',
          writerName: 'John Doe',
          editorName: 'Jane Smith',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          title: 'Article 2',
          link: '#',
          date: '2024-11-21',
          writerName: 'Alice Johnson',
          editorName: 'Bob Brown',
        },
      ]);
  
      const publishedArticles = ref([
        {
          id: 3,
          image: 'https://via.placeholder.com/150',
          title: 'Article 3',
          link: '#',
          date: '2024-11-20',
          writerName: 'Chris White',
          editorName: 'Dana Black',
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/150',
          title: 'Article 4',
          link: '#',
          date: '2024-11-19',
          writerName: 'Evan Green',
          editorName: 'Fiona Grey',
        },
      ]);
  
      return {
        forEditArticles,
        publishedArticles,
      }
    },
  }
</script>
  
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }
  
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .article-lists {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .article-list {
    flex: 1 1 calc(50% - 10px);
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #555;
    margin-bottom: 15px;
  }
  
  .article-card {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .article-card:last-child {
    border-bottom: none;
  }
  
  .article-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .article-details {
    flex: 1;
  }
  
  .article-details h3 {
    margin: 0 0 5px;
    color: #333;
  }
  
  .article-details a {
    display: inline-block;
    margin: 5px 0;
    color: #007bff;
    text-decoration: none;
  }
  
  .article-details a:hover {
    text-decoration: underline;
  }
  
  .article-details p {
    margin: 3px 0;
    color: #666;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .article-lists {
      flex-direction: column;
    }
  
    .article-list {
      flex: 1 1 100%;
    }
  }
</style>
  