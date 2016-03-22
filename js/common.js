$(function() {
  changeStyle('#classNav', 'opend cur');
})

function changeStyle(el, cName1, cName2) {
  $(el).on('click', function() {
    if ($(this).hasClass(cName1)) {
      $(this).removeClass(cName1).addClass(cName2);
    } else {
      $(this).removeClass(cName2).addClass(cName1);
    }
  })
}
/*dialog*/
function dialog(opts, closeBtn) {
  var mask = $('<div class="mask" style="display:block"></div>');
  var content = $('<div class="dialog-content"></div>');
  var innerCon=$('<div class="dialog-inner">' + opts.content + '</div>');
  $('html,body').css({
    'overflow': 'hidden'
  });
  var destoryDialog = function() {
    openScorll();
    mask.remove();
    content.remove();
  }
  content.on('click', '.js-close', function() {
    destoryDialog();
  });
  if (opts.buttons) {
    var btbox = $('<div class="bt-box tc clearfix"></div>');
    $.each(opts.buttons, function(idx, button) {
      var btn = $('<a class="' + button.myClassName + '">' + button.text + '</a>');
      btn.on('click', function() {
        if (!$.isFunction(button.callback)) {
          destoryDialog();
        } else {
          button.callback(destoryDialog);
        }
      });
      btbox.append(btn);
    });
    innerCon.append(btbox);
  }
  content.append(innerCon);
  mask.append(content);
  $('body').append(mask);
  $('body').append(content);
  $.isFunction(opts.onAfterShow) && opts.onAfterShow();
  return content;
}

function openScorll() {
  $('html,body').css({
    'overflow': 'auto'
  });
}

function showmsg(msg) {
  var box = document.createElement("div");
  box.className = "msg-box";
  var content = document.createElement("div");
  content.className = "msg-con";
  box.appendChild(content);
  content.innerHTML = msg;
  document.body.appendChild(box);
  $(box).animate({
    opacity: 1
  }, 600, function() {}).animate({
    opacity: 1
  }, 600, function() {}).animate({
    opacity: 0
  }, 600, function() {
    $(box).remove();
  });
}