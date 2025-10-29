import SwiftUI

struct ContentView: View {
    @State private var isSidebarVisible = false
    
    var body: some View {
        NavigationView {
            ZStack {
                WebView(htmlFile: "index", isSidebarVisible: $isSidebarVisible)
                    .edgesIgnoringSafeArea(.all)
                
                if isSidebarVisible {
                    Color.black.opacity(0.4)
                        .ignoresSafeArea()
                        .onTapGesture {
                            isSidebarVisible = false
                        }
                    
                    SidebarView(isVisible: $isSidebarVisible)
                        .animation(.default, value: isSidebarVisible)
                }
                
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