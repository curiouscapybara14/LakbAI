import SwiftUI

struct ContentView: View {
    @State private var isSidebarVisible = false
    
    var body: some View {
        NavigationView {
            ZStack {
                // Main content with WebView
                WebView(htmlFile: "index")
                    .edgesIgnoringSafeArea(.all)
                
                // Sidebar overlay
                if isSidebarVisible {
                    Color.black.opacity(0.4)
                        .ignoresSafeArea()
                        .onTapGesture {
                            isSidebarVisible = false
                        }
                    
                    SidebarView(isVisible: $isSidebarVisible)
                        .animation(.default, value: isSidebarVisible)
                }
                
                // Menu button
                VStack {
                    HStack {
                        Button(action: {
                            isSidebarVisible.toggle()
                        }) {
                            Image(systemName: "line.horizontal.3")
                                .foregroundColor(.black)
                                .padding()
                        }
                        Spacer()
                    }
                    Spacer()
                }
            }
        }
    }
}