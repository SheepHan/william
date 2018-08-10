$(function() {
  function rgb(r, g, b, count) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.count = count;
  }

  $("#image").load(function() {
    console.log(22);
    var blockSize = 47, // 选取密度
    canvas = document.createElement('canvas'), // 画布
    context = canvas.getContext('2d'), data, width, height, i = -4, length, red, green, blue, count = 0, rgbArray = [];
    for (var j = 0; j < 8; j++) {
      rgbArray[j] = new rgb(0, 0, 0, 0);
    }
    if (!context) {
      // 未获取，设置默认值
      // rgb = { r: 51, g: 104, b: 172 }
    } else {
      height = canvas.height = this.naturalHeight;
      width = canvas.width = this.naturalWidth;
      context.drawImage(this, 0, 0);
      try {
        data = context.getImageData(0, 0, width, height);
        length = data.data.length;
        // 将颜色放入对应位置
        while ((i += blockSize * 4) < length) {
          var rIndex = (data.data[i] - 128) >> 31;
          var gIndex = (data.data[i + 1] - 128) >> 31;
          var bIndex = (data.data[i + 2] - 128) >> 31;
          var index = ((rIndex + 1) << 2) + ((gIndex + 1) << 1)
              + (bIndex + 1); // 计算二进制索引
          rgbArray[index].r += data.data[i];
          rgbArray[index].g += data.data[i + 1];
          rgbArray[index].b += data.data[i + 2];
          rgbArray[index].count++;
        }
  
        rgbArray.sort(function(a, b) {
          return a.count - b.count
        })
        // 计算最终颜色
        var html = "";
        for (var k = 0; k < 8; k++) {
          var r = ~~(rgbArray[k].r / rgbArray[k].count);
          var b = ~~(rgbArray[k].b / rgbArray[k].count);
          var g = ~~(rgbArray[k].g / rgbArray[k].count);
          var rStr = r.toString(16);
          var gStr = g.toString(16);
          var bStr = b.toString(16);
          if (rStr.length === 1)
            rStr = '0' + rStr;
          if (gStr.length === 1)
            gStr = '0' + gStr;
          if (bStr.length === 1)
            bStr = '0' + bStr;
  
          var colorStr = rStr + gStr + bStr;
          if ("000000" != colorStr)
            html += "<div class=\"color\" style=\"background:#"
                + colorStr + "\">#" + colorStr + "</div>";
        }
        $("#colory").append(html).append("<div class=\"clear\"></div>");
      } catch (e) {
        console.info(e)
        //rgb = { r: 51, g: 104, b: 172 }
      }
    }
  })
})