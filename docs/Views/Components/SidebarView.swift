import SwiftUI

struct SidebarView: View {
    @Binding var isVisible: Bool
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 20) {
                Text("Menu")
                    .font(.title)
                    .padding(.top, 50)
                
                NavigationLink("Home", destination: HomeView())
                NavigationLink("Profile", destination: ProfileView())
                NavigationLink("Settings", destination: SettingsView())
                
                Spacer()
            }
            .padding()
            .frame(width: UIScreen.main.bounds.width * 0.7)
            .background(Color.gray.opacity(0.95))
            .edgesIgnoringSafeArea(.vertical)
            
            Spacer()
        }
        .transition(.move(edge: .leading))
    }
}