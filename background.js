/**
 * request请求，不可以引入jQuery，使用原生xmlHttpRequest
 */
function _request (url, data) {
	const xhr = new XMLHttpRequest()
	xhr.open('POST',url,true)
	xhr.setRequestHeader('content-type','application/json')
	xhr.responseType = 'json'
	xhr.send(JSON.stringify(data))
}

// chrome - 通讯
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	this._request(`${request.host}/accept/dealData`, request.params)
});