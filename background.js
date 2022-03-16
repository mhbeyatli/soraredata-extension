console.log("This is background")

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
  // console.log(tab, "Ext button is clicked")
  let msg = {
    text: "player-search"
  }

  chrome.tabs.sendMessage(tab.id, msg)
}