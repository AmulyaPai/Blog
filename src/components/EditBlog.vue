<template>
    <div id="edit-blog">
        <h3>Edit Blog</h3>
        <div class="row">
            <form @submit.prevent="updateBlog" class="col s12">
                <div class="row">
                    <div class="input field col s12">
                        <input disabled type="text" v-model="blog_id"
                        required>
                        <label>Blog ID</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="updateBlog" class="col s12">
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
            <form @submit.prevent="updateBlog" class="col s12">
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
    name:'edit-blog',
    data(){
        return{
            blog_id:null,
            title:null,
            description:null
           

        }
    },
    beforeRouteEnter(to,from,next){
        db.collection('blogs').where('blog_id',
        '==',to.params.blog_id).get()
        .then((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{
                next(vm=>{
                    vm.blog_id = doc.data().blog_id
                    vm.title = doc.data().title
                    vm.description = doc.data().description

                })
            })
        })
   },
    watch:{
        '$route':'fetchData'
    },
    methods:{
        fetchData(){
            db.collection('blogs').where
            ('blog_id','==',this.$route.params.blog_id).get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{
                    this.blog_id=doc.data().blog_id,
                    this.title=doc.data().title,
                    this.description=doc.data().description    
                })

            })
        },
        updateBlog(){
            db.collection('blogs').where
            ('blog_id','==',this.$route.params.blog_id).get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc)=> {
                    doc.ref.update({
                        blog_id:this.blog_id,
                        title:this.title,
                        description:this.description

                })
                .then(()=>{
                    this.$router.push({name:'view-blog',
                    params:{blog_id:this.blog_id }})
                    
                   
                })
                                    
            })
        })
        }
       
    } 
}
</script>