<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>       
        <template v-for="product in productList">
          <h3>{{ product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <!-- 是否是HOT的标记 -->
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <!-- PC/phone产品之间的横线出现是否 -->
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <!-- 通过ajax形式请求数据[vue-resource] -->
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList.appData">
            <a :href="item.url" class="new-item"> {{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" :inv="invTime"></slide-show>
      <div class="index-board-list">
        <!-- line-last不是最后的会有一个index-board-item:{margin-right:20px}
        存在的时候为0px；此时用index来绑定这个class;
        index-board-+变量就是以ID为标志的图片的 -->
        <div
        class="index-board-item"
        v-for="(item, index) in boardList"
        :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
          <div class="index-board-item-inner" >
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <!-- router-link 实现跳转的形式 -->
              <router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideShow'
export default {
  components: {
    slideShow
  },
  created: function () {
    //promise对象
    //使用json server
    this.$http.get('api/appData')
    .then((res) => { //请求成功的回调
      this.newsList = res.data.data
    }, (err) => {  //请求失败的回调
      console.log(err)
    })
  },
  data () {
    return {
      invTime: 2000,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'picture1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'picture2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'picture3',
          href: 'detail/publish'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'picture4',
          href: 'detail/forecast'
        }
      ],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          toKey: 'analysis',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'earth',
          toKey: 'count',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'loud',
          toKey: 'forecast',
          saleout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          toKey: 'publish',
          saleout: false
        }
      ],
      newsList: [],
      productList: {
        pc: {
          title: 'PC产品',
          list: [
            {
              name: '数据统计',
              url: 'http://localhost:8080/detail/count'
            },
            {
              name: '数据预测',
              url: 'http://localhost:8080/detail/forecast'
            },
            {
              name: '流量分析',
              url: 'http://localhost:8080/detail/analysis',
              hot: true
            },
            {
              name: '广告发布',
              url: 'http://localhost:8080/detail/publish'
            }
          ]
        },
        app: {
          title: '手机应用类',
          last: true,
          list: [
            {
              name: '微信',
              url: 'http://weixin.com'
            },
            {
              name: '天猫',
              url: 'http://www.tmall.com',
              hot: true
            },
            {
              name: '知乎',
              url: 'http://zhihu.com'
            },
            {
              name: '百度地图',
              url: 'https://map.baidu.com/'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
