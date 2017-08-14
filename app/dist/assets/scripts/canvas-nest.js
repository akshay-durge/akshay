/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
**/
! function() {
  //å°è£…æ–¹æ³•ï¼ŒåŽ‹ç¼©ä¹‹åŽå‡å°‘æ–‡ä»¶å¤§å°
  function get_attribute(node, attr, default_value) {
    return node.getAttribute(attr) || default_value;
  }
  //å°è£…æ–¹æ³•ï¼ŒåŽ‹ç¼©ä¹‹åŽå‡å°‘æ–‡ä»¶å¤§å°
  function get_by_tagname(name) {
    return document.getElementsByTagName(name);
  }
  //èŽ·å–é…ç½®å‚æ•°
  function get_config_option() {
    var scripts = get_by_tagname("script"),
      script_len = scripts.length,
      script = scripts[script_len - 1]; //å½“å‰åŠ è½½çš„script
    return {
      l: script_len, //é•¿åº¦ï¼Œç”¨äºŽç”Ÿæˆidç”¨
      z: get_attribute(script, "zIndex", -1), //z-index
      o: get_attribute(script, "opacity", 0.5), //opacity
      c: get_attribute(script, "color", "0,0,0"), //color
      n: get_attribute(script, "count", 99) //count
    };
  }
  //è®¾ç½®canvasçš„é«˜å®½
  function set_canvas_size() {
    canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
    canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  //ç»˜åˆ¶è¿‡ç¨‹
  function draw_canvas() {
    context.clearRect(0, 0, canvas_width, canvas_height);
    //éšæœºçš„çº¿æ¡å’Œå½“å‰ä½ç½®è”åˆæ•°ç»„
    var e, i, d, x_dist, y_dist, dist; //ä¸´æ—¶èŠ‚ç‚¹
    //éåŽ†å¤„ç†æ¯ä¸€ä¸ªç‚¹
    random_points.forEach(function(r, idx) {
      r.x += r.xa, 
      r.y += r.ya, //ç§»åŠ¨
      r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1, 
      r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //ç¢°åˆ°è¾¹ç•Œï¼Œåå‘åå¼¹
      context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //ç»˜åˆ¶ä¸€ä¸ªå®½é«˜ä¸º1çš„ç‚¹
      //ä»Žä¸‹ä¸€ä¸ªç‚¹å¼€å§‹
      for (i = idx + 1; i < all_array.length; i++) {
        e = all_array[i];
        // å½“å‰ç‚¹å­˜åœ¨
        if (null !== e.x && null !== e.y) {
          x_dist = r.x - e.x; //xè½´è·ç¦» l
          y_dist = r.y - e.y; //yè½´è·ç¦» n
          dist = x_dist * x_dist + y_dist * y_dist; //æ€»è·ç¦», m

          dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //é è¿‘çš„æ—¶å€™åŠ é€Ÿ
            d = (e.max - dist) / e.max,
            context.beginPath(),
            context.lineWidth = d / 2,
            context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
            context.moveTo(r.x, r.y),
            context.lineTo(e.x, e.y),
            context.stroke());
        }
      }
    }), frame_func(draw_canvas);
  }
  //åˆ›å»ºç”»å¸ƒï¼Œå¹¶æ·»åŠ åˆ°bodyä¸­
  var the_canvas = document.createElement("canvas"), //ç”»å¸ƒ
    config = get_config_option(), //é…ç½®
    canvas_id = "c_n" + config.l, //canvas id
    context = the_canvas.getContext("2d"), canvas_width, canvas_height, 
    frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
      window.setTimeout(func, 1000 / 45);
    }, random = Math.random, 
    current_point = {
      x: null, //å½“å‰é¼ æ ‡x
      y: null, //å½“å‰é¼ æ ‡y
      max: 20000 // åœˆåŠå¾„çš„å¹³æ–¹
    },
    all_array;
  the_canvas.id = canvas_id;
  the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
  get_by_tagname("body")[0].appendChild(the_canvas);

  //åˆå§‹åŒ–ç”»å¸ƒå¤§å°
  set_canvas_size();
  window.onresize = set_canvas_size;
  //å½“æ—¶é¼ æ ‡ä½ç½®å­˜å‚¨ï¼Œç¦»å¼€çš„æ—¶å€™ï¼Œé‡Šæ”¾å½“å‰ä½ç½®ä¿¡æ¯
  window.onmousemove = function(e) {
    e = e || window.event;
    current_point.x = e.clientX;
    current_point.y = e.clientY;
  }, window.onmouseout = function() {
    current_point.x = null;
    current_point.y = null;
  };
  //éšæœºç”Ÿæˆconfig.næ¡çº¿ä½ç½®ä¿¡æ¯
  for (var random_points = [], i = 0; config.n > i; i++) {
    var x = random() * canvas_width, //éšæœºä½ç½®
      y = random() * canvas_height,
      xa = 2 * random() - 1, //éšæœºè¿åŠ¨æ–¹å‘
      ya = 2 * random() - 1;
    // éšæœºç‚¹
    random_points.push({
      x: x,
      y: y,
      xa: xa,
      ya: ya,
      max: 6000 //æ²¾é™„è·ç¦»
    });
  }
  all_array = random_points.concat([current_point]);
  //0.1ç§’åŽç»˜åˆ¶
  setTimeout(function() {
    draw_canvas();
  }, 100);
}();