import Vue from 'vue'

// 完整引入 element
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)

// 按需引入 element 需要配置 babel.config.js 文件
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Select,
  Option,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

// 按需引入 和 完整引入 element , 需要根据实际情况去判断哪种方式使用, 要是使用过多组件的话推荐 完整引入
