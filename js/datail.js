$(function() {
  /*bg-orange 是立即报名的样式 bg-orange1是取消报名的样式*/
  $('.js-apply').on('click', function() {
    /*按钮是立即评价状态*/
    if ($(this).hasClass('bg-orange')) {
      $(this).children('span').text('取消报名');
      $(this).removeClass('bg-orange').addClass('bg-orange1');
    } else {
      $(this).children('span').text('立即报名');
      $(this).removeClass('bg-orange1').addClass('bg-orange');
    }
  });
  /*评价*/
  $('.js-review').on('click', function() {
    var _this = $(this);
    /*按钮是立即评价状态*/
    if ($(this).hasClass('bg-green')) {
      var conHtml = '<div class="review-headBox"><a href="javascript:;" class="datail-close clearfix"><i class="iconfont icon-close js-close fr"></i></a><p class="review-head">请根据培训质量对该培训课程进行打分操作</p><div class="review-tip flex-box"><p class="flex-item">非常好 <span>100分</span></p><p class="flex-item">好 <span>80分</span></p></div><div class="review-tip flex-box"><p class="flex-item">一般 <span>60分</span></p><p class="flex-item">差 <span>40分</span></p></div></div>';
      conHtml += '<ul class="review-list js-rlist">';
      /*ajax部分*/
      var dataobj = {
        'msg': [{
          'title': '1.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }, {
          'title': '2.您认为《管理学》的难易程度是：'
        }]
      };
      $.each(dataobj.msg, function(idx, obj) {
        var htmls = ' <li><p class="review-head">' + dataobj.msg[idx].title + '</p><div class="review-option flex-box tc js-roption"><a class="flex-item" href="javascript:;">非常好 </a><a class="flex-item" href="javascript:;">好 </a><a class="flex-item" href="javascript:;">一般 </a><a class="flex-item" href="javascript:;">差 </a></div></li>';
        conHtml += htmls;
      });
      conHtml += '</ul>';
      /*弹出框*/
      var content = dialog({
        content: conHtml,
        buttons: [{
          text: '确定',
          myClassName: 'bt-yes',
          callback: function(dd) {
            /*关闭窗口 在dd（）之前做验证之类的事情*/
            dd();
            _this.children('span').text('取消评价');
            _this.removeClass('bg-green').addClass('bg-green1');
          }
        }]
      });
      /*计算ul的高度*/
      listHeight(content.children().children('.js-rlist'));
    } else {
      $(this).children('span').text('立即评价');
      $(this).removeClass('bg-green1').addClass('bg-green');
    }
  });
  /*进行评价选择*/
  $(document).on('click', '.js-roption a', function() {
    var iHtml = '<i class="iconfont icon-ok"></i>';
    $(this).addClass('active').append(iHtml);
    $(this).siblings('a').removeClass('active').children('i').remove();
  });
});

function listHeight(el) {
  var dialogEl = $(el).parent().parent('.dialog-content');
  var remh = (($('body').width()) / 750) * 100;
  var headHeight = $(el).siblings('.review-headBox').height();
  var boxHeight = $(el).siblings('.bt-box').height();
  var dialogmaxHeight = $('body').height() - ((($('body').width()) / 750) * 40);
  dialogEl.css("maxHeight", dialogmaxHeight);
  var dialogHeight = dialogEl.height();
  if (dialogHeight == dialogmaxHeight) {
    remh = (($('body').width()) / 750) * 120;
  }
  var listh = dialogHeight - headHeight - boxHeight - remh;
  $(el).height(listh);
  dialogEl.css("marginTop", -(dialogHeight / 2));
}