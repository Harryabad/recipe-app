<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,
        initial-scale=1.0" />
    <title>Recipes App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
</head>

<body>
    <div class="mobile-container">
        <header>
            <button id="random"><i class="fas fa-random"></i></button>
            <input type="text" id="search-term" />
            <button id="search"><i class="fas fa-search"></i></button>
            
        </header>

        <div class="fav-container">
            <h3>Favourite Meals</h3>
            <ul class="fav-meals" id="fav-meals">
                <!-- ul>li*3>img+span  -->

                <!--  updated via JS, originally 4 icons, now updated via clicks
                    <li><img src="https://www.themealdb.com/images/media/meals/1550440197.jpg" alt=""><span>Eggs</span></li>
                    <li><img src="https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg" alt=""><span>Chicken</span></li>
                    <li><img src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" alt=""><span>Carbonara</span></li>
                    <li><img src="https://www.themealdb.com/images/media/meals/t3r3ka1560461972.jpg" alt=""><span>Biscuits</span></li>
                    -->
            </ul>
        </div>
        <div class="meals" id="meals"></div>

    </div>

    <div class="popup-container hidden" id="meal-popup">
        <div class="popup">
            <button id="close-popup" class="close-popup"><i class="far fa-times-circle"></i></button>

            <div class="meal-info" id="meal-info">



            </div>


        </div>
    </div>



</body>

</html>
