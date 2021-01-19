// components/screening/shipdate/shipdate.js
Component({
    properties: {

    },

    data: {
        start:'请选择起始日期',
        end:'请选择结束日期'
    },

    methods: {
        startDateChange(e){
            this.triggerEvent('startdate',{
                startDate:e.detail.value
            })
            this.setData({
                start:e.detail.value
            })
        },
        endDateChange(e){
            this.triggerEvent('enddate',{
                endDate:e.detail.value
            })
            this.setData({
                end:e.detail.value
            })
        },
        onRemove(){
            this.setData({
                start:'请选择起始日期',
                end:'请选择结束日期'
            })
        }
    }
})
