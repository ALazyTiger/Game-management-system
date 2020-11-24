<template>
  <div class="content">
      <div class="crumbs">角色权限<div class="tips"><span></span></div></div>
      <div class="container">
        <div class="app-container">
          <el-button type="primary" @click="handleAddRole">新增角色</el-button>
          <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="权限类型" width="220">
              <template slot-scope="scope">
                {{ scope.row.key }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称" width="220">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="描述">
              <template slot-scope="scope">
                {{ scope.row.description }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
            <el-form :model="role" label-width="80px" label-position="left">
              <el-form-item label="名称">
                <el-input v-model="role.name" placeholder="角色名称" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="role.pw" placeholder="角色密码" />
              </el-form-item>
              <el-form-item label="描述">
                <el-input  v-model="role.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="角色描述"/>
              </el-form-item>
              <el-form-item label="菜单">
                <el-tree ref="tree" :data="routesData" :props="defaultProps"  show-checkbox node-key="id" class="permission-tree"/>
              </el-form-item>
            </el-form>
            <div style="text-align:right;">
              <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
              <el-button type="primary" @click="confirmRole">Confirm</el-button>
            </div>
          </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
import axios from 'axios'
const defaultRole = {
  key: '',
  name: '',
  pw:'',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
          console.log(path)
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      axios.get('/static/routers.json').then(response => {
        this.serviceRoutes = response.data.data
        this.routes = response.data.data
      });
      // dataGet('/static/roles.json',{ },(data, all) => {
      //   this.serviceRoutes = data.List
      //   this.routes = this.generateRoutes(data)
      // });
    },
    async getRoles() {
      axios.get('/static/roles.json').then(response => {
        this.rolesList = response.data.data
      });
      // dataGet('/static/roles.json',{ },(data, all) => {
      //   this.rolesList = data.List
      // });
    
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []
      console.log(routes)
      for (let route of routes) {
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
           console.log('onlyOneShowingChild',onlyOneShowingChild.name)
        if (route.children && onlyOneShowingChild ) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          name: route.name,
          id:route.id
        }
        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      console.log("res",res)
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {

      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)

      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        console.log(this.generateArr(routes))
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除该角色?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath =  route.id
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        // const { data } = await addRole(this.role)
        //       console.log("this.role",this.role)
        // this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .crumbs {
    margin: 10px 0;
    font-size: 20px;
    color: #333;
    font-weight: bold;
  }
  .container {
    padding: 30px;
    background: #fff;
    border: 1px solid #b3b3b6;
    border-radius: 5px;
    .rolequery-box {
      margin-bottom: 20px;
    }
    .app-container {
      .roles-table {
        margin-top: 30px;
      }
      .permission-tree {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
