<template>
    <div id="view-blog">
        <ul class="collection with-header">
        <li class="collection header"><h4>{{title}}</h4></li>
        <li class="collection header"><b>Blog_Id</b>:{{blog_id}}</li>
        <li class="collection header"><b>Title</b>:{{title}}</li>
        <li class="collection header"><b>Description</b>:{{description}}</li>
       </ul>
       <router-link to="/" class="btn-grey">BACK</router-link>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name:'edit-blog',
            params:{blog_id:blog_id}}"
             class="btn-floating btn-large red">
            <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './FirebaseInit'
export default{
    name:'view-blog',
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
        .then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
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
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    this.blog_id=doc.data().blog_id,
                    this.title=doc.data().title,
                    this.description=doc.data().description    
                })

            })
        },
       
    } 
}
</script>