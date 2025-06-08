# Biblioteca - React Native

Um sistema de um um aplicativo voltado ao gerenciamento de uma biblioteca ficticia. Desenvolvido em **Typescript** usando o framework **React Native** como parte de uma atividade para a disciplina de **Programação para Dispositivos Móveis**.

Membros:
- Pedro Henrique Alexandre
- Thiago dos Santos Araujo
- Vinicius Cavalcante Pequeno

## Tecnologias Usadas

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-%23323330?style=for-the-badge&logo=typescript&logoColor=%233178C6)
![React Native](https://img.shields.io/badge/React%20Native-%2320232a?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/Expo-%23000000?style=for-the-badge&logo=expo&logoColor=%2361DAFB)
![Vector Icons](https://img.shields.io/badge/Vector%20Icons-%23000000?style=for-the-badge&logo=react&logoColor=%2361DAFB)

</div>

# Estrutura do Projeto

```
Directory structure:
└── src/
      ├── database/
      │   ├── DataBaseManager.ts
      │   ├── library.db
      │   └── repository/
      │       ├── BookRepository.ts
      │       ├── ClientRepository.ts
      │       ├── EmployeeRepository.ts
      │       └── LoanRepository.ts
      ├── libs/
      │   └── AuthLib.ts
      ├── model/
      │   ├── auth/
      │   │   ├── AuthService.ts
      │   │   ├── UserEntity.ts
      │   │   └── UserService.ts
      │   ├── book/
      │   │   ├── BookEntity.ts
      │   │   └── BookService.ts
      │   ├── client/
      │   │   ├── ClientEntity.ts
      │   │   └── ClientService.ts
      │   ├── employee/
      │   │   ├── EmployeeEntity.ts
      │   │   └── EmployeeService.ts
      │   └── loan/
      │       ├── LoanEntity.ts
      │       └── LoanService.ts
      └── screens/
         ├── LoginScreen.tsx
         ├── customer/
         │   ├── AccountBook.tsx
         │   └── LibraryBook.tsx
         └── librarian/
               ├── CreateLoan.tsx
               ├── ManageBook.tsx
               ├── ManageClient.tsx
               ├── ManageLoan.tsx
               ├── RegisterBook.tsx
               └── RegisterClient.tsx
```

# Como Executar
### Pré-requisitos

- **Typescript**
- **React Native**

### Passos para execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Pedroo722/ShoppingList-PDM.git
   cd ShoppingList-PDM/
   ```
2. **Instale as dependências** (Caso necessário):
   ```bash
   npm install
   ```
3. **Execute o aplicativo**:
   
   Caso tenha o dispositivo Android ou iOS com o aplicativo *Expo GO*, execute:
     ```bash
     npm start
     ```
    E aponte o a câmera, com o leitor de QR Code aberto, para o QR Code que aparecer no terminal.

   Caso tenha o ambiente configurado para Android ou iOS, execute:

   - Para **Android**:

     ```bash
     npx react-native run-android
     ```

   - Para **iOS** (somente macOS):

     ```bash
     npx react-native run-ios
