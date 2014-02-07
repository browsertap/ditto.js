module.exports = {

  /**
   * returns the path of an element
   */

  getElementPath: function (node) {
    var path = [];

    if (node.getAttribute("id")) {
      return node.getAttribute("id");
    }

    while (node.parentNode) {

      // childNodes doesn't have indexOf, so cast as an array
      path.push(Array.prototype.slice.call(node.parentNode.childNodes, 0).indexOf(node));
      node = node.parentNode;
    }
    return path.reverse();
  },

  /**
   * finds an element based on a path
   */

  findElementByPath: function (path) {


    if (typeof path === "string") {
      return document.getElementById(path);
    }

    var node = document;
    for (var i = 0, n = path.length; i < n; i++) {
      node = node.childNodes[path[i]];
      if (!node) return;
    }
    return node;
  }
}