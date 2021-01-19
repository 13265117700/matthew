// components/screening/shipamount/shipamount.js
Component({
    properties: {

    },
    data: {
        minValue:'',
        maxValue:'',
    },
    methods: {
        handleMinValue(e){
            this.triggerEvent('minvalue',{
                minValue:e.detail.value
            })
            this.setData({
                minValue:e.detail.value
            })
        },
        handleMaxValue(e){
            this.triggerEvent('maxvalue',{
                maxValue:e.detail.value
            })
            this.setData({
                maxValue:e.detail.value
            })
        },
        onRemove(){
            this.setData({
                minValue:'',
                maxValue:''
            })
        }
    }
})
