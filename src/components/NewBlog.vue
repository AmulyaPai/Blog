<template>
    <div id="new-blog">
        <h3>New Blog</h3>
        <div class="row">
            <form @submit.prevent="saveBlog" class="col s12">
                <div class="row">
                    <div class="input field col s12">
                        <input type="text" v-model="blog_id"
                        required>
                        <label>Blog ID</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveBlog" class="col s12">
                <div class="row">
                    <div class="input field col s12">
                        <input type="text" v-model="title"
                        required>
                        <label>Blog Title</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveBlog" class="col s12">
                <div class="row">
                    <div class="input field col s12">
                        <input type="text" v-model="description"
                        required>
                        <label>Blog Descrition</label>
                    </div>
                </div>
                 <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn-grey">Cancel</router-link>
            </form>
        </div>
        </div>
</template>

<script>
import db from './FirebaseInit'
export default{
    name:'new-blog',
    data(){
        return{
            blog_id:null,
            title:null,
            description:null
        }
    },
    methods:{
        saveBlog(){
            db.collection('blogs').add({
                blog_id: this.blog_id,
                title: this.title,
                description: this.description
            })
            .then(docRef=>{
                this.$router.push("/")
            })
            .catch(error=> console.log(err))
        }

    }
}
</script>