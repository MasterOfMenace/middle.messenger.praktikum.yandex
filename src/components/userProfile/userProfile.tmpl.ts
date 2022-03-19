const template = `
<ul class="user-profile">
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{login}}</p>
    <p class="user-profile-item__label">Логин</p>
  </li>
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{displayName}}</p>
    <p class="user-profile-item__label">Имя в чате</p>
  </li>
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{email}}</p>
    <p class="user-profile-item__label">Почта</p>
  </li>
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{name}}</p>
    <p class="user-profile-item__label">Имя</p>
  </li>
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{secondName}}</p>
    <p class="user-profile-item__label">Фамилия</p>
  </li>
  <li class="user-profile-item">
    <p class="user-profile-item__value">{{phone}}</p>
    <p class="user-profile-item__label">Телефон</p>
  </li>
</ul>`;

export default template;
