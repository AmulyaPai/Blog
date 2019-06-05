<template>
    <div id="dashboard">
       <ul class="collection with-header">
       <li class="collection-header"><h4>Blogs</h4></li>
       
        <li v-for="blog in blogs"  v-bind:key="blog.id"
         class="collection-item">
         <div class="chip">{{blog.blog_id}}</div>
            {{blog.title}}

            <router-link class="secondary-content" v-bind:to="{name:'view-blog', params:{blog_id:blog.blog_id}}">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>
<script>
import db from './FirebaseInit'
export default{
    name:'dashboard',
    data () {
        return{
            blogs:[]
        }
    },
     created(){
        db.collection('blogs').get().then
        (querySnapshot=>{
            querySnapshot.forEach(doc=>{
                const data={
                    'id':doc.id,
                    'blog_id':doc.data().blog_id,
                    'description':doc.data().description,
                    'title':doc.data().title
                }
                this.blogs.push(data)
            })
        })
    }
}
</script>