var pageTitle;
var pageUrl;
var _host;

window.onload = function () {
	pageTitle = window.document.title
	pageUrl = window.location.href

	console.log('启明星辰安全检测中...')
	console.log('当前页面名称：' + pageTitle)
	console.log('当前页面地址：' + pageUrl)
	console.log('启明星辰安全检测中...')

	_host = window.location.protocol  == 'https:' ? _httpsHost : _httpHost

	/**
	 * e.target.dataset.blur
	 * blur字段判断node是否被注入监听
	 */
	// 录入记录
	$("input, textarea").blur(function(e){
		if (!e.target.value.trim() || e.target.dataset.blur) return
		_request({
			event: 'input',
			content: e.target.value
		})
	});

	// 点击记录
	$(document).click(function(_e) {
		var nodeName = _e.target.nodeName
		var domText = nodeName == 'I' ? '【点击图标】' : _e.target.innerText 
		// 是否已经监听blur事件，如果监听不监听第二次
		var isBindBlur = _e.target.dataset.blur ? true : false
		if (isBindBlur) return

		if (['TEXTAREA', 'INPUT'].includes(nodeName)) {
			_e.target.dataset.blur= true
			_e.target.addEventListener('blur', function(e){
				if (!e.target.value.trim()) return
				_request({
					event: 'input',
					content: e.target.value
				})
			})
		} else {
			if (!domText || !domText.trim() || domText.length > 100) return
			_request({
				event: 'click',
				content: domText
			})
		}
	});

}


function _request (data) {
	var params = {
		pageTitle,
		pageUrl,
		event: data.event,
		content: data.content
	}
	chrome.runtime.sendMessage({params, host: _host});
}


