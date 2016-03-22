$(function(){
/* alert( $('#fixboxh').height()+'---'+$('body').height());*/
/*初始化wrap的高度*/
 var wraph=$('body').height()-$('#fixBox').height();
 $('#wrapper').height(wraph);
})
var myScroll;
function loaded() {
  var pullUpEl = document.getElementById('pullUp');
  var pullUpOffset = pullUpEl.offsetHeight;
  myScroll = new iScroll('wrapper', {
    useTransition: true,
    onRefresh: function() {
      if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更新';
      }
    },
    onScrollMove: function() {
      if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更新';
        this.maxScrollY = this.maxScrollY;
      } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉更新';
        this.maxScrollY = pullUpOffset;
      }
    },
    onScrollEnd: function() {
      if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';
        pullUpAction();
      }
    }
  });
  setTimeout(function() {
    document.getElementById('wrapper').style.left = '0';
  }, 800);
}