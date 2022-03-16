console.log("This is background")

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
  console.log(tab, "Ext button is clicked")
}