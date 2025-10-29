import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let htmlFile: String
    @Binding var isSidebarVisible: Bool
    
    func makeCoordinator() -> WebViewCoordinator {
        WebViewCoordinator(self)
    }
    
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.userContentController.add(context.coordinator, name: "sidebarHandler")
        
        let webView = WKWebView(frame: .zero, configuration: config)
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        if let htmlPath = Bundle.main.path(forResource: htmlFile, ofType: "html") {
            let url = URL(fileURLWithPath: htmlPath)
            let request = URLRequest(url: url)
            webView.load(request)
        }
        
        // Update sidebar state
        let script = "document.querySelector('.main-content').classList.\(isSidebarVisible ? 'add' : 'remove')('content-shifted')"
        webView.evaluateJavaScript(script, completionHandler: nil)
    }
}