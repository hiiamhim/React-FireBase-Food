import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect, useState} from "react"


const AvailableMeals = () => {
  const [Meals,setMeals]=useState([])
  const [isLoading,setIsLoading]=useState(true)
  const [httpError,setHttpError]=useState(null)
  useEffect(()=>{
    const fetchData=async ()=>{
      const resposne =await fetch("https://custom-react-434f4-default-rtdb.firebaseio.com/Meals.json?print=pretty")
      if(!resposne.ok){
        console.log(resposne);
        throw new Error(`Error! status: ${resposne.status}`);
      }
      const resposneObj=await resposne.json()
    
    const loadedMeals=[]
    for(const key in resposneObj){
      loadedMeals.push({
        id:key,
        name:resposneObj[key].name,
        description:resposneObj[key].description,
        price:resposneObj[key].price
        
      })
          
    }
    setMeals(loadedMeals)
    setIsLoading(false)
    

    }
    fetchData().catch((e)=>{
      console.log(e.message +" "+e.name)
      setHttpError(e)
      setIsLoading(false)
    })
  },[])
  const mealsList =Meals.map((meal) => (

  
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  
  if(isLoading){
   return  <section className={classes.mealLoading}>...Loading</section>
  }

  if(httpError){
    return  <section className={classes.mealError}>Error...</section>
   }

  return (
    
    
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
