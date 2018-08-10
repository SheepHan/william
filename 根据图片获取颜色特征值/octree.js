$(function () {
  $("#image").load(function () {
    getColor();
  })

  var reducible = [];
  var leafNum = 0;
  var blockSize = 47; //取值密度
  var colorNum = 8;// 提取颜色数目
  for (var i = 0; i < 8; i++)
    reducible.push(null);
  // 八叉树节点
  var OctreeNode = function () {
    this.isLeaf = false;// 默认不是子节点
    this.pixelCount = 0;// 该节点插入颜色的次数
    this.red = 0;// 通道颜色值，逐步累加
    this.green = 0;
    this.blue = 0;

    // 兄弟节点初始化
    this.children = new Array(8);
    for (var i = 0; i < this.children.length; i++)
      this.children[i] = null;

    // 这里的 next 不是指兄弟链中的 next 指针
    // 而是在 reducible 链表中的下一个节点
    this.next = null;
  };
  var root = new OctreeNode();

  /**
   * 获取颜色并输出至页面
   * @returns
   */
  function getColor() {
    var pixels = getPixels("image");
    var data = pixels.data;
    var array = [];
    //像素点转换成rgb颜色信息
    for (var i = 0; i < data.length; i += 4 * blockSize) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      array.push({ r: r, g: g, b: b });
    }
    //传入颜色信息，开始建树
    buildOctree(array, colorNum);

    var colors = {};
    colorsStats(root, colors);

    var result = [];
    for (var key in colors) {
      result.push({ color: key, count: colors[key] });
    }

    result.sort(function (a, b) {
      return a.count - b.count;
    });
    var string = "";
    for (var i = 0; i < result.length; i++) {
      string += "<div class=\"color\" style=\"background:#" + result[i].color + "\">#" + result[i].color + "</div>";
    }
    $("#colorx").append(string).append("<div class=\"clear\"></div>");
    console.log("统计结果：" + result.length)
    console.log("done");
  }

  /**
   * 获取像素信息
   * 
   * @param {String}image
   *          图片名称
   * @returns
   */
  function getPixels(imageId) {
    console.log(22222);
    var canvas = document.createElement('canvas'), // 创建画布
      context = canvas.getContext('2d'), data, width, height,
      imgEl = document.getElementById(imageId);
    if (!context) {
      console.log("未获取有效图像数据")
    } else {
      height = canvas.height = imgEl.naturalHeight;
      width = canvas.width = imgEl.naturalWidth;
      console.log("" + width + "  " + height)
      context.drawImage(imgEl, 400, 0);
      data = context.getImageData(0, 0, width, height);
      console.log("读取"+width);
      return data;
      // try {
      //   data = context.getImageData(0, 0, width, height);
      //   console.log("读取"+width);
      //   return data;
      // } catch (e) {
      //   console.log("---无法读取图像---");
      // }
    }
    return null;
  }

  /**
   * createNode
   * 
   * @param {OctreeNode}
   *          parent the parent node of the new node
   * @param {Number}
   *          idx child index in parent of this node
   * @param {Number}
   *          level node level
   * @return {OctreeNode} the new node
   */
  function createNode(level) {
    var node = new OctreeNode();
    if (level === 7) {
      node.isLeaf = true;
      leafNum++;
    } else {
      node.next = reducible[level + 1];
      reducible[level + 1] = node;
    }

    return node;
  }

  /**
   * addColor
   * 
   * @param {OctreeNode}
   *          node the octree node
   * @param {Object}
   *          color color object
   * @param {Number}
   *          level node level
   * @return {undefined}
   */
  function addColor(node, color, level) {
    if (node.isLeaf) {
      node.pixelCount++;
      node.red += color.r;
      node.green += color.g;
      node.blue += color.b;
    } else {
      // 由于 js 内部都是以浮点型存储数值，所以位运算并没有那么高效
      // 在此使用直接转换字符串的方式提取某一位的值
      //      var str = "";
      //      var r = color.r.toString(2);
      //      var g = color.g.toString(2);
      //      var b = color.b.toString(2);
      //      while (r.length < 8)
      //        r = '0' + r;
      //      while (g.length < 8)
      //        g = '0' + g;
      //      while (b.length < 8)
      //        b = '0' + b;
      //
      //      str += r[level];
      //      str += g[level];
      //      str += b[level];
      //      var idx = parseInt(str, 2);
      var r = (color.r >> (7 - level)) & 1;
      var g = (color.g >> (7 - level)) & 1;
      var b = (color.b >> (7 - level)) & 1;
      var idx = (r << 2) + (g << 1) + b;

      if (null === node.children[idx]) {
        node.children[idx] = createNode(level + 1);
      }

      if (undefined === node.children[idx]) {
        console.log(color)
        console.log(color.r.toString(2));
      }

      addColor(node.children[idx], color, level + 1);
    }
  }

  /**
   * reduceTree
   * 
   * @return {undefined}
   */
  function reduceTree() {
    // find the deepest level of node
    var level = 7;
    while (null === reducible[level])
      level--;
    // get the node and remove it from reducible link
    var node = reducible[level];
    reducible[level] = node.next;
    // merge children
    var r = 0;
    var g = 0;
    var b = 0;
    var count = 0;
    for (var i = 0; i < 8; i++) {
      if (null === node.children[i])
        continue;
      r += node.children[i].red;
      g += node.children[i].green;
      b += node.children[i].blue;
      count += node.children[i].pixelCount;
      leafNum--;
    }

    node.isLeaf = true;
    node.red = r;
    node.green = g;
    node.blue = b;
    node.pixelCount = count;
    leafNum++;
  }

  /**
   * buildOctree
   * 
   * @param {Array}
   *          pixels The pixels array
   * @param {Number}
   *          maxColors The max count for colors
   * @return {undefined}
   */
  function buildOctree(pixels, maxColors) {
    for (var i = 0; i < pixels.length; i++) {
      // 添加颜色
      addColor(root, pixels[i], 0);

      // 合并叶子节点
      while (leafNum > maxColors)
        reduceTree();
    }
  }

  /**
   * colorsStats
   * 
   * @param {OctreeNode}
   *          node the node will be stats
   * @param {Object}
   *          object color stats
   * @return {undefined}
   */
  function colorsStats(node, object) {
    if (node.isLeaf) {
      var r = parseInt(node.red / node.pixelCount).toString(16);
      var g = parseInt(node.green / node.pixelCount).toString(16);
      var b = parseInt(node.blue / node.pixelCount).toString(16);
      if (r.length === 1)
        r = '0' + r;
      if (g.length === 1)
        g = '0' + g;
      if (b.length === 1)
        b = '0' + b;

      var color = r + g + b;
      if (object[color])
        object[color] += node.pixelCount;
      else
        object[color] = node.pixelCount;

      return;
    }

    for (var i = 0; i < 8; i++) {
      if (null !== node.children[i]) {
        colorsStats(node.children[i], object);
      }
    }
  }
})