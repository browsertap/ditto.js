xpgen = require("xpgen")

###
###

module.exports = (element, minDepth = 1) -> 
  _findXPath(element, minDepth)
  
###
###

_findXPath = (element, minDepth) ->

  # first need to find the correct element - this could be an anchor, or
  # input
  ce  = _findCorrectElement element
  rxp = _findRelativeXPath ce

  # id present? that's all we need
  return "//" + rxp if $(ce).attr("id")

  uxp = _findUniqueXPath ce, rxp, minDepth
  uxp

###
 finds the relative xpath from the parent
###

_findRelativeXPath = (element, prefix) ->

  $e = $(element)
  nodeName = element.nodeName.toLowerCase()
  parent = $(element.parentNode)

  posibilities = [
    xpgen().element(nodeName).eq("@id", $e.attr("id")),
    xpgen().element(nodeName).index("text()[contains(.,'"+$e.text().trim().replace(/'/g,"&pos;")+"')]")
  ]


  for attr in ["class", "href", "name", "value", "placeholder", "alt"]
    continue unless (a = $e.attr(attr))
    posibilities.push xpgen().element(nodeName).eq("@" + attr, a)


  # index is last resort
  posibilities.push xpgen().element(nodeName).index(parent.children(element.nodeName).index(element) + 1)


  for xpath in posibilities
    xpath = String(xpath).substr(1)
    if parent.xpath(xpath).length is 1
      return xpath


###
 finds the unique xpath from the document
###

_findUniqueXPath = (element, rxp, minDepth) ->
  xpath = [rxp]

  cp = element
  $b = $(document.body)
  depth = 0

  while cp.parentNode
    depth++
    cxpath = "//" + (p = xpath.join("/"))
    break if $(cp).attr("id") or ($b.xpath(cxpath).length is 1 and depth >= minDepth)
    cp = cp.parentNode
    xpath.unshift(_findRelativeXPath(cp, p))

  cxpath



###
###

_findCorrectElement = (element) ->
  cp = element

  while cp
    return cp if /INPUT|BUTTON|A/.test cp.nodeName
    cp = cp.parentNode

  cp or element







