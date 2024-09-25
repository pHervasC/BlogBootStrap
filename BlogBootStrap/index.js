// Hacer las solicitudes a la API para obtener posts, usuarios y comentarios
Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
    fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json())
  ])
    .then(([posts, users, comments]) => {
      // Seleccionar el contenedor donde se mostrará el contenido del blog
      const blogContainer = document.getElementById('blog-posts');
  
      // Recorrer los posts obtenidos y crear el contenido HTML
      posts.forEach(post => {
        // Encontrar el usuario que corresponde al userId del post
        const user = users.find(u => u.id === post.userId);
  
        // Crear un div para cada post
        const postElement = document.createElement('div');
        postElement.classList.add('col-md-12', 'mb-4');
  
        // Crear una tarjeta de Bootstrap
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'shadow-sm');
  
        // Crear el cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        // Crear el título del post
        const titleElement = document.createElement('h5');
        titleElement.classList.add('card-title');
        titleElement.textContent = post.title;
  
        // Crear el cuerpo del post
        const bodyElement = document.createElement('p');
        bodyElement.classList.add('card-text');
        bodyElement.textContent = post.body;
  
        // Crear el botón para mostrar el usuario en un modal
        const userButton = document.createElement('button');
        userButton.classList.add('btn', 'btn-primary', 'mt-2');
        userButton.textContent = 'Ver usuario';
        userButton.setAttribute('data-bs-toggle', 'modal');
        userButton.setAttribute('data-bs-target', `#userModal-${user.id}`);
  
        // Crear el modal para mostrar las características del usuario
        const userModal = document.createElement('div');
        userModal.classList.add('modal', 'fade');
        userModal.id = `userModal-${user.id}`;
        userModal.setAttribute('tabindex', '-1');
        userModal.setAttribute('aria-labelledby', `userModalLabel-${user.id}`);
        userModal.setAttribute('aria-hidden', 'true');
  
        userModal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="userModalLabel-${user.id}">Detalles del Usuario: ${user.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Teléfono:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p><strong>Compañía:</strong> ${user.company.name}</p>
                <p><strong>Dirección:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        `;
  
        // Crear el acordeón para los comentarios
        const accordionContainer = document.createElement('div');
        accordionContainer.classList.add('accordion', 'accordion-flush');
        accordionContainer.id = `accordionFlushExample-${post.id}`;
  
        // Filtrar los comentarios correspondientes al post actual
        const postComments = comments.filter(comment => comment.postId === post.id);
  
        // Crear los elementos del acordeón para los comentarios
        postComments.forEach((comment, index) => {
          const accordionItem = document.createElement('div');
          accordionItem.classList.add('accordion-item');
  
          const headerId = `flush-heading-${post.id}-${index}`;
          const collapseId = `flush-collapse-${post.id}-${index}`;
  
          // Crear el encabezado del acordeón
          const accordionHeader = document.createElement('h2');
          accordionHeader.classList.add('accordion-header');
          accordionHeader.id = headerId;
  
          const accordionButton = document.createElement('button');
          accordionButton.classList.add('accordion-button', 'collapsed');
          accordionButton.type = 'button';
          accordionButton.setAttribute('data-bs-toggle', 'collapse');
          accordionButton.setAttribute('data-bs-target', `#${collapseId}`);
          accordionButton.setAttribute('aria-expanded', 'false');
          accordionButton.setAttribute('aria-controls', collapseId);
          accordionButton.textContent = `Comentario de ${comment.name}`;
  
          accordionHeader.appendChild(accordionButton);
  
          // Crear el cuerpo del acordeón
          const accordionCollapse = document.createElement('div');
          accordionCollapse.id = collapseId;
          accordionCollapse.classList.add('accordion-collapse', 'collapse');
          accordionCollapse.setAttribute('aria-labelledby', headerId);
          accordionCollapse.setAttribute('data-bs-parent', `#accordionFlushExample-${post.id}`);
  
          const accordionBody = document.createElement('div');
          accordionBody.classList.add('accordion-body');
          accordionBody.textContent = comment.body;
  
          accordionCollapse.appendChild(accordionBody);
          accordionItem.appendChild(accordionHeader);
          accordionItem.appendChild(accordionCollapse);
          accordionContainer.appendChild(accordionItem);
        });
  
        // Añadir el título, cuerpo del post, botón "Ver usuario" y acordeón al contenedor del post
        cardBody.appendChild(titleElement);
        cardBody.appendChild(bodyElement);
        cardBody.appendChild(userButton); // Añadir el botón "Ver usuario"
        cardBody.appendChild(accordionContainer); // Añadir el acordeón de comentarios
        cardElement.appendChild(cardBody);
  
        // Añadir la tarjeta al contenedor del post
        postElement.appendChild(cardElement);
        blogContainer.appendChild(postElement);
  
        // Añadir el modal del usuario al final del body
        document.body.appendChild(userModal);
      });
    })
    .catch(error => console.error('Error al obtener los posts, usuarios y comentarios:', error));
  