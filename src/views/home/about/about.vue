<template>
  <div class="contact-box">
    <div class="page">
      <Row :space="20">
        <Cell :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="h-panel h-panel-no-border shadow">
            <div class="h-panel-bar">
              <span class="h-panel-title">联系我们</span>
            </div>
            <div class="h-panel-body">
              <Form :readonly="true">
                <FormItem label="负责人：">{{contact.owner}}</FormItem>
                <FormItem label="办公地址：">{{contact.address}}</FormItem>
                <FormItem label="联系电话：">{{contact.phone}}</FormItem>
                <FormItem label="校内邮箱：">{{contact.email}}</FormItem>
                <FormItem label="更新时间：">{{contact.updateTime}}</FormItem>
              </Form>
            </div>
          </div>
        </Cell>
        <Cell :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <div class="h-panel h-panel-no-border shadow">
            <div class="h-panel-bar">
              <span class="h-panel-title">关于我们</span>
            </div>
            <div class="h-panel-body">
              <div style="line-height: 24px;" v-html="about.content"></div>
            </div>
          </div>
        </Cell>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      contact: {},
      about: {}
    };
  },
  methods: {
    tigger() {
      R.Contact.getType("contact").then(res => {
        console.log(res);
        if (res.ok) {
          if (res.body == null) return;
          this.contact = res.body;
        }
      });
      R.Contact.getType("about").then(res => {
        console.log(res);
        if (res.ok) {
          if (res.body == null) return;
          this.about = res.body;
        }
      });
    }
  },
  mounted() {
    this.tigger();
  }
};
</script>

<style lang="less" scoped>
.contact-box {
  margin: 40px 0px;
}
</style>