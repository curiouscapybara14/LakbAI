import WebKit
import SwiftUI

class WebViewCoordinator: NSObject, WKScriptMessageHandler {
    var parent: WebView
    
    init(_ parent: WebView) {
        self.parent = parent
    }
    
    func userContentController(_ userContentController: WKUserContentController, 
                             didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any] else { return }
        // Handle messages from JavaScript here
    }
}
