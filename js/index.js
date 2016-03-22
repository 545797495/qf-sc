//初始化绑定iScroll控件  
document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, false);
 /*document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);*/
  document.addEventListener('DOMContentLoaded', loaded, false);
var myScroll, obj, el,
  pullUpEl, pullUpOffset
generatedCount = 0;
/*假json数据*/
var datas = {
  'status': 'ok',
  'list': [{
    'page': 0,
    'datass': [{
      'hname': 'Lina俱乐部分享计划00Lina俱乐部分享计划00Lina俱乐部分享计划00Lina俱乐部分享计划00Lina俱乐部分享计划00Lina俱乐部分享计划00',
      'himg': 'img/test/1.jpg',
      'cname': ['管理学', '法务管理学', '运筹学0','法务管理学', '运筹学0'],
      'cstatus': '0'
    }, {
      'hname': 'Lina俱乐部分享计划01',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学0'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划02',
      'himg': 'img/test/3.jpg',
      'cname': ['管理学', '法务管理学', '运筹学0'],
      'cstatus': '0'
    }, {
      'hname': 'Lina俱乐部分享计划03',
      'himg': 'img/test/3.jpg',
      'cname': ['管理学', '法务管理学', '运筹学0'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划04',
      'himg': 'img/test/3.jpg',
      'cname': ['管理学', '法务管理学', '运筹学0'],
      'cstatus': '0'
    }]
  }, {
    'page': 1,
    'datass': [{
      'hname': 'Lina俱乐部分享计划10',
      'himg': 'img/test/1.jpg',
      'cname': ['管理学', '法务管理学', '运筹学1'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划11',
      'himg': 'img/test/1.jpg',
      'cname': ['管理学', '法务管理学', '运筹学1'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划12',
      'himg': 'img/test/1.jpg',
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划13',
      'himg': 'img/test/1.jpg',
      'cname': ['管理学', '法务管理学', '运筹学1'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划14',
      'himg': 'img/test/1.jpg',
      'cname': ['管理学', '法务管理学', '运筹学'],
      'cstatus': '1'
    }]
  }, {
    'page': 2,
    'datass': [{
      'hname': 'Lina俱乐部分享计划20',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划21',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划22',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学'],
      'cstatus': '1'
    }, {
      'hname': 'Lina俱乐部分享计划23',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学']
    }, {
      'hname': 'Lina俱乐部分享计划24',
      'himg': 'img/test/2.jpg',
      'cname': ['管理学', '法务管理学', '运筹学']
    }]
  }]
};
/*里面的一些参数 后台根据ajax返回值名称更新 */
function getList(obj) {
  var htmls = '<article><a href="#" class="flex-box"> <img src="' + obj.himg + '" class="list-img" /><div class="list-rcon flex-item relative"><h3 class="m-head ellips">' + obj.hname + '</h3><p class="ellips">上课时间：2016-21-11-2016-12-31</p><div class="class-list flex-box"><label>课程：</label><p class="flex-item clearfix">';
  /*有课程*/
  if (obj.cname) {
    for (var k = 0; k < obj.cname.length; k++) {
      htmls += '<span>《' + obj.cname[k] + '》</span>';
    }
  }
  htmls += '</p></div>';
  /*状态 待评价和待报名*/
  var cstatus = obj.cstatus;
  if (cstatus) {
    switch (cstatus) {
      case '0':
        htmls += '<span class="span-status bg-orange tc">待报名</span>';
        break;
      case '1':
        htmls += '<span class="span-status bg-green tc">待评价</span>';
        break;
      default:
        break;
    }
  }
  htmls += '</div></a></article>';
  return htmls;
}

function queryList(page, el) {
  /*ajax*/
  /* $.ajax({
     type: "get",
     url: "",             
     data: {
       page:  page
     },
     dataType: "json",
     success: function(data) {
       
     }
   });*/
  /*ajax*/
  var count = 0; /*记录页码匹配0 1 如果一次返回一页数据不需要*/
  /*里面的一些参数 后台根据ajax返回值名称更新 datas的话 是 传page值过去返回的 这里由于我是静态数据模拟的是一次性返回 后台按需更新下面代码 把page传入ajax返回数据*/
  if (datas) { /*此处判断有没有列表数据 改成相应的列表数据属性*/
    $.each(datas.list, function(idx, obj) {
      if (obj.page == page) {
        /*如果后台是返回单页数据 直接只要下面的循环即可 tag就是列表数据属性名*/
        var tag = obj.datass;
        $.each(tag, function(idx, obj) {
          var htmls = getList(tag[idx]);
          el.append(htmls);
        });
        count++; /*记录页码匹配0 1 如果一次后台只返回一页数据不需要*/
      }
    });
  } else {
    $('#pullUp').hide();
    if (page == 0) {
      $('#listTip').text('没有符合条件的项目');
    } else {
      $('#listTip').text('没有更多了');
    }
    $('#listTip').show();
  }
  /*记录页码匹配0 1 如果一次只返回一页数据不需要下列判断 直接没有数据返回过来时提示没有更多*/
  if (count == 0) {
    $('#listTip').text('没有更多了');
    $('#pullUp').hide();
    $('#listTip').show();
  }
  /*记录页码匹配0 1 如果一次只返回一页数据不需要下列判断 直接没有数据返回过来时提示没有更多*/
}
/*进页面第一次加载*/
queryList(0, $('#classList'));
/*上拉加载*/
function pullUpAction() {
  var el = $('#classList');
  setTimeout(function() {
    var li, i;
    generatedCount++;
    /*传页码*/
    queryList(generatedCount, el);
    /*刷新*/
    myScroll.refresh();
  }, 1000);
}

