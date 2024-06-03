<template>
  <div class="container">
    <div class="super-admin">
      <h2>Интерфейс для админа</h2>
      <div class="column">
        <h2>Выберите, что хотите сделать</h2>
        <a href="/admin/book-room"
          ><div class="item">
            <p>Бронь комнаты</p>
          </div></a
        >
        <a href="/admin/book-hall"
          ><div class="item">
            <p>Бронь зала</p>
          </div></a
        >
        <a href="/admin/book-object"
          ><div class="item">
            <p>Бронь объектов</p>
          </div></a
        >
        <a href="/admin/show-history-book-room"
          ><div class="item">
            <p>История брони комнат</p>
          </div></a
        >
        <a href="/admin/show-history-book-hall"
          ><div class="item">
            <p>История брони залов</p>
          </div></a
        >
        <a href="/admin/show-history-book-object"
          ><div class="item">
            <p>История брони объектов</p>
          </div></a
        >
        <a href="/admin/show-paid-room"
          ><div class="item">
            <p>Показать оплаченные комнаты</p>
          </div></a
        >
        <a href="/admin/show-paid-hotel-hall"
          ><div class="item">
            <p>Показать оплаченные залы</p>
          </div></a
        >
        <a href="/admin/show-paid-object"
          ><div class="item">
            <p>Показать оплаченные объекты</p>
          </div></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style src="../../assets/css/super.css" />
