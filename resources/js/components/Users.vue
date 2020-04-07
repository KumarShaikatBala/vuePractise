<template>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>
                        <div class="card-tools">
                            <button class="btn btn-success" @click="addModal">Add New <i class="fa fa-user-plus"></i></button>
                            <!-- Button trigger modal -->
                            <!-- Modal -->
                            <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
                                        <div class="modal-body">

                                                <div class="form-group">
                                                    <label>Name</label>
                                                    <input v-model="form.name" type="text" name="name"
                                                           class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                                    <has-error :form="form" field="name"></has-error>
                                                </div>
                                                <div class="form-group">
                                                    <label>Email</label>
                                                    <input v-model="form.email" type="email" name="email"
                                                           class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                                    <has-error :form="form" field="email"></has-error>
                                                </div>
                                                <div class="form-group">
                                                    <label>Bio</label>
                                                    <textarea v-model="form.bio"  name="bio"
                                                           class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                                                        <has-error :form="form" field="bio"></has-error></textarea>
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleFormControlSelect1">Type</label>
                                                    <select class="form-control" :class="{ 'is-invalid': form.errors.has('type') }" id="exampleFormControlSelect1" v-model="form.type" name="type">
                                                        <option value="Admin">Admin</option>
                                                        <option value="User">User</option>
                                                    </select>
                                                    <has-error :form="form" field="type"></has-error>
                                                </div>
                                                <div class="form-group">
                                                    <label>Password</label>
                                                    <input v-model="form.password" type="password" name="password"
                                                           class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                                    <has-error :form="form" field="password"></has-error>
                                                </div>


                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                            <button :disabled="form.busy" type="submit" class="btn btn-primary">Create</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Register</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type}}</td>
                                <td>{{user.created_at |myDate}}</td>
                                <td>
                                    <a href="javascript:void(0)" @click="deleteUser(user.id)"><i class="fa fa-trash"></i></a>
                                    <a href="javascript:void(0)" @click="editUser(user)"><i class="fa fa-edit"></i></a>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

</template>

<script>
    export default {
        data () {
            return {
                // Create a new form instance
                users:{},
                form: new Form({
                    name: '',
                    email: '',
                    bio: '',
                    type: '',
                    password: '',
                    remember: false
                })
            }
        },
        methods:{
            addModal(){
                $('#add').modal('show');
                this.form.reset();
            },
            editUser(user){
                $('#add').modal('show');
                this.form.fill(user);
            },


            loadUsers(){
                axios.get('api/user').then(({data})=>(this.users=data.data));
            },
          createUser(){
              this.$Progress.start();

              this.form.post('api/user')
              .then(()=>{

                  Fire.$emit('afterCreate');

                  /* this.loadUsers();*/

                  $('#add').modal('hide');

                  Toast.fire({
                      icon: 'success',
                      title: 'Signed in successfully'
                  });

                  this.$Progress.finish();
              })
.catch(()=>{});

          },
            deleteUser(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.form.delete('api/user/'+id).then(()=>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            Fire.$emit('afterCreate');
                        }).catch(()=>{});
                    }
                })
            }
        },
/*        created() {
        },*/
        mounted() {
           this.loadUsers();
           /*setInterval( ()=>this.loadUsers(),3000);*/

            Fire.$on('afterCreate',()=>{
this.loadUsers();
            });
        }
    }
</script>
