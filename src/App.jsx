import React, { useState, useEffect, useRef } from "react";
import {
  Star, Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, X,
  Sparkles, Camera, Video, Palette, LayoutGrid, UtensilsCrossed,
  Heart, Users, ShieldCheck, MessageSquare, MapPinned, CheckCircle2,
  Flower2, Sun, Aperture, ShoppingBag, Gift
} from "lucide-react";
import bgMandalaRed from "./assets/bg-mandala-red.png";
import bgFloralCream from "./assets/bg-floral-cream.png";
import bgPeacockFrame from "./assets/bg-peacock-frame.png";
import bgArchPillars from "./assets/bg-arch-pillars.png";
import bgMandalaAged from "./assets/bg-mandala-aged.png";
import bgMandalaCreamCorners from "./assets/bg-mandala-cream-corners.png";
const logoImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACxCAMAAABa3mezAAAAwFBMVEUAAABYGiCukmb59u2VblDQsYvGqHXoy6Lkz6mIZTfi0a44BgfLtJR2TjL68NTj2q+vrKnLtpqwr2qslHR1T0p1dHO2noflrqi5o4T868qObmWubGq0nY7+/n/+5MX/f3///wCQc21zUk5wIiCpkXh3dxj/AABzVlPpsHVbNTRqPUFnRDyyZRm1tTxUMzD/AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLFZSrAAAAMHRSTlMA/fcQ+vD865/9YP6h/FkdCGcEqegDoA7hm6EGYgLkAgFlogVmAgFZBKfvrAMEVgGy77VoAAArT0lEQVR42tV9h2IbV7LszAmTMBEZIJhEUnLY3fv/f/eq6pwJAElZ9vXqXcOyREEkUNPTp7s6Ikn+3sc6ObWJbU+Jtck/5nGf2JMl8H/U4x6Iu1MPSf+DZN1DN9rKJn4PVfnniNo+5F1SGWOT/p8j6qTFUfRZ5u366R+D+gn67I0xWZF0/xwFWdvCGJ8Z3/3fUhD79XM4UGgI+pQbov5c1v3j/wflWe8+vpw7Ys7aTZ0bqPVnJgTf9rPxJrbuqAbvLbHdCXN1SZvWC/Xh/ffYHpdSFXb3My35gRat5juuD/bGtSRVhiNot2nqgNr4NrmR6UEaYwuf/1ybuE4G4wC7s/Gvs7mzxYg5Tc9tBtRV8vY4f8ObJF0V3mc/+Zy+2b3Rw9eVgK8ntclp6myTpgG1l+WLx9ESIwDXPjyKD1Tnv2c6rDWmKI4TcKq31Fn2uWi3aXy4tpbgdVWPRFx7EwBT2Pbw9aeBjk7advUocMC29zs+bbx9bdLpsbUVVcRCsTtA9tQKXxe8PfhL9fNEvXuzxu3D+0l0lC6VpMYXdXtOrx5DSzdT8VqjiHUQuh6e3v88JrhOamcq3XEZBjscKUxLzJV16c1jY3ldhRVmIb5bywIVFPVPYoJ90hl3tOukAwK7Jm7i9ZS47Zr03eMLzJvJ8gh53eE4VgPgStTJTxG1hXKU0OhdR5DJv0NcVUi3k2HGfJxF7qDMGVhfNd6pgnDX0Oqfxan6ZHCmxh+VcQ6oB0B/fH8E/cPDjHrbB6r6Zqsc2l/xCuAqrWz1TxA1eKch1o5KAtUGdOi3TJ19nlXC5ZnPFypyR98OvEWW5W0eQHc6mvYnGJC13TszgC19JXgXNJl2I2tfR8ABdJZD7m4Ud09PqavL8gj6l45nsfv6X1cQGwS91ukD6IxWzlK9q2FSjNytXF6WuUvd6XQMzzayfNbyYoA5y3kUvlZ0iz/BgADgoN9NQVETbkJiNLruVIrhfGk8vgaoUa9J+grpMzHzX2wSDMh/n98VcoZH4vXBH1qeQjv5lDyjjL3LfJrlZTZp9qWSN/EBdLAmoFd/s1tcv5OBPRzWUF/by5E4J8w12VPdTmcug0Sz1DeGyKH06SzqDKIusvHhu8Ma+jH0h/6dY+z+us7c7dbrXo/1en0XePHebPhHNaEeoOWZ/TJbCgnZlFlTZvxqelxgnnPa6AC5IFIL0OGt1nyrw+GgN/vrFGN4L+m2GqjESnp1tQSd6RjaiDfHIWyyMoPZ4P8OmA2eiz6G+lGNkANNhX+pquqdpNvqL0FOemhtve67Dqym64ahjiqsx3HogrSBF1peXwKshzyj6QiPxjW+wVk0/hQuCfrhWyl10TIQyL0MSSDXeVF18VHhlB7fOfgfOLD3sG1l1Fo9ApDxayNyRLwGCmOqTTyEOoJALVOCn09z04x63VS4pAqgc/5kLjXxNCN+0vLw0Jd/8Rhu3AhVcAm0HvhIsgD8KGKdbIzpvoyO0BM1v/LGSb9T4/NyUmrYCsSG8OYZfE1G8fKBK5iACzttyi+3kccPZBw6EtBTURT7DR51gXNj2+Hbt/98e65a0GjBrpNuIGj7a4AFffYmzShy3HAPkafwmeNJfBbvh7rBOxrpSNu+fvv27RUvaFu8VZHn+K1tEfTekFYoS/v0x6oCH2tc4bb7ZHe3271821wR5fNAq+fMHt+5AE0lcHIqUha3mv04Hq8VweAEQ8q+aKvNNp0Csy1ea1/zcWz2BTToJujtGS9MWNtPggeBrn5frdKPH83AqBWyJuhKoB0VMjAPiZ3ww5N6FupBMCJ8hR3O6WePTW5uQFulu2fZt5/w8ENSOVecV5++NEyY4isexOIcDJ6DoDOqRDyXYB84ky4Lkq9zWg+S6cp+DhkRWk7nfn8tw92yIGI/Ad0TtP/ea6eNULfMNtZR0hnP7ATaE7QzUdLNiWAQxfj2zn3vdYf3IQ1QPnVzRGkh6qfPQNffBQ3UsBEmJ3lKg43LADsVaCqzQJss6rU7AUxB3eivgzLnPgL9eIW5Y7Z+vpJPRL1maDJLehUsWn79+q6VJaRBvAkOy6jH8xNAD5vhGQVM3+uiS2o+UI8lqA7aYpdIKepPrcd5fvmVvHQuxjxZMY9vKg3hwLQtgfvaZ+V8cSYLToOmborDXNHiywYvaqIrWoJ+vDqGPIl9OyqI/eQoHhCOuCo4DXB6korUk3Wu/IOfRZODFOUyr3h4U45yHmgl3Ai5Lk6ywghazExWs1NxcuCvJs8kkPFqYGV8u7QeNjxmUdtP9OMAq+C630fQ8F6A6+mkc99MWrLCMSu8dARfVFXQCecH62sb7R94K9iEkZiJelIbD7g4tSVfDjRk0r1nsez11TEMsh6VwkrUXz/Q6Y1z7e+jey5LGN8m56HJHf5cpSO+wpQTQalhu8vG+KGlRWGWht9QMdI60ojgWaAezaPJ+SKe7gjiLvOH6Gr+Q5Y9gaYzZEp7KV/Kvb06qotgcEol5lmD1175pjEQDb5iJCXMJ2Amz7QVE02MZuCrEXvTHMMf0/nxaiq+TwX/nZOe4PAxWPcBtHeKJx9G7n2+Av2YzIph7ZXsP2R5Zj7nYGuN2eI8kloYaAp4J8RtKGcJwsbIwGQ1yR89nwfznjN9lnZWqDP5HcdIgUa9BHZwwXzSddrGPLlR6UmVlwrzjk93TCTNFo+85wjQoMkpb3owxr5g2uPgiyOcTKeqVlWZ7FipxOF93RaKZ7u6OkL54Q9NdvLBlGdyPfzf8ebNMQ4Ds4mafp00OlmImhzfdu+DgINzm2E8MZAqQpHGjc7AkF9I0BCjLRwshT+eVK6Al9wzXUbJH6EqisILQxthTkxTwsrAvvDwhRSJYUBJDpsXfvRZc5D+daEKXZ8sRP5eP+QQN3XELNsBdW6Ck1m5NJIhxuZWyUey43ASqQ0wmEyd0c8XfCrHvwM2Ce7Rt9Lq3I2GmTEFHZfJTwF1AH2/0AQ5l6Ur1LP3t6C7Al58H22HIUBqdLoZitpNvqyoQZisaYAp1xkkQIV3lpkGCtsTClDDF+LiQQprX9VZkDAUrubLgVXhuptmtNRUDwRfySje1samBhscOv7s7W2bw4ElwnqmHni3MlCEerPdulMdBC7tqOze0wgzmslasqHkgFeDQ8TlkAx46oNhNIKYsDi8VP5Yjfp72uN2WsRq8KalCZ6RTzMko+Egzq904pGcjkphn271434n554vmClJsSshkpDkGoO+rGCmi7pBR44LwEXQlQ3HgqatPjIRI9Qw1NQfRi6W19aMLFAUF/fQ+GAL9ShyxTUU82MncE8hXImqMv45od69MbfPjFc5UY8VQwGewnr0ZXq2xPGjac5NwOwtdaNTDhXRFp7OBziFQloTEkvw5UqwNzNf4u3DXSybmbnE3EhedCqM2SvTR6S97ZdyhpS7DW5WAxc4gl6lR7IhvOjpmvSF8Jy/hfB8Dw3/ZWdVzCejy82Q9GsY7Ep5pQBcttwsed2+hkQk6uYKdEyPTMVTqLM9BNRC/DTajMSCcvAlalj+eBBJEigKyGQbsTYu0o2iqIY6OnEevruOZ5BS5h1gGokK4q1E7fMQveZepA/XKk5Ve8UKxo8+kQm0nCE67pdKHnbkQ6Oo9ecBqszjBxuFH9/Q6frR5MFl44A0kMbqXE9RH96fzI2hKNSvkquGge6fEk8iZBiOQ6wdfSutHEPZOeKOj5wuy52YdmhE1+esDsEVAbbK2X2wc4/hIAbwvW7CwESHCUWzypWbQ9AFIKBYKGpZWKYHyJ9NTOCIyB37OtS8QI3wAywkA3uf3D/Syg0FfaPPwj2B+hA6/ncxdHc8BJHmBY+oChSTTb4WoPXjKOMu1iSkMYP0Uyk8m8iNt80q5gWcTuKKZwfuDwof3n3vIelI8BCWdyzbXjybJmDCeRbxzDoZwPhgRPwRZll3J1RtqV1OxzG68yk4gMn7n0Q2owvSLjo75Tu6SVmKjdJJgnz/VJkNHF3jqu1qMh9UP7eSUGp83+swRzzSDhPKuNA7oPU04bDLR1xEr+IsWcn8A7aqBpYBgmxxYLzfToH/nhYPDr+2Pc1HETI/RZXsrgLyrwhTKL2Lnrw7bEo3gE+X9WjjUtL11G2DIDammHl3r/xVpYozfWzPCgzeBrrhjweoNDwajTQh7/rDgtsDSHAnIEypHwsd8i2w50wz2Y6FUpanMxXClAwdqZP9H3uEhZuu44zAj0o96Yfycd4FS1dBD3b/orG5vDK7vBNDL1T1sslubaEWXoSFTlGg6Sjf1odQ1B+klLu+gHpk0XnhLLZRPc6nLJQMYur6Ud0hvkh2X0e3GEwd6bOrkztrL+b4amvgtUybFvVo9GAFXXTeCMGBrt53SphWHY17n8Qqv1htiGLzvaWxWofafRf6QdidMkB2tcXTReR1NBz5KTpxluxy1ktxcyqfd0n/ixjU+8rEDtpgoICAC6/iaaQFfbx85hHjoTQngabNoC01Ru1VPIExqYzfL9Bq1jmtDkyXDyqs9LicgscK9gXf2+GrMfgt/ejF91MaO1cy9UijwNruehkPTO0Q0OPkAu9dliUTAy1FvQheoh3hhRhctnw3Il6qspqR7pZJzbaGpX2zkw8mi+x33VFQSEw61S5O0ZQuUpuEWzB5Fmp32RHWgvVG239cIAR55/GDqEucS5atIPBRrYUYltZtKlUS6fjElHNVncUAbCAGSQhD+dthkZfFfYQ1bHM67IqxH5wOXZ+fA/T0S1JncxEs1MD+zRjok+zuEYcPb/FqKGrIWwoCftpGY1TKaxuH/zfQ4AtJMp114fchSTHYy3Z7noQdKLrdbM/2cglfH3MRVJzT6oIL25NJ8UWLEfYZ+OgNpxoYLQhvyceV/zd7cU7ldeYIS+Gm2SNqqjOEfGI6CbG3pzUfswZwI9DPJ6j0a5Ne8I3tnPyhq8VT26HZDjrs9HoZ7BwNecV4oCBDFPkjbLxVLdlWfqyR6iB37LroP8ndlXWyfrIbSZpKgsBpQ/NdeCgGxMGnnGtZhrMbypmOGm7kiBP+kuCG4NiaI/PwI5U8b/fb9PwNEU9y10ti5FHM2dT2LoCWoaEdMeZUBH2oeDcmmtdTpT9OOFKpm419C5jJml6HoeqIumS8jBi6hK+GuWtVI1KzhA85UzarwXi49HJ2wL6dX3K7+mK3dr9yIYOIiJzXSs9cQ90BGn9vKzWxFIKpzqEO7rIK/DRnvYPNCh+3aL0lkKegq+UuiopBP20gq1Q1C2nOnQLVZ2Ur94H/2687SNe6L+5bv91eHqdi02Wbtttk66KgjlIMafXRvuHMUdJ8F4Y2QpkXc5axylXjtfbzsj/j76Yin96w+avaxNIb/EppHkyjEpwvBHpQoYBMX4Z6Hw0e3OpAgI+zvbhsL25wl2hcgp/M5fH/B+qRMQRnOkS5dopalbpQVqRJxhsmodnp475DHCbqx7/E8IA4KHajGCb3pavAtXP427LwsCvK9TFbxPzB3t5Bzhf36zb9zV11l+6SwaXb39LtRb15witLXRCFp6R5GYU6ganH/PexMBcI1vd7ncB0wOt4IoNax4pnyTgZhg6XXTKCLetCJKNnfjHkHmnyLtupFPN1eoP+pZufFt07Epk/FnatWPLEiMazLsRQMs8WkLNAsu4S8Y7+O42NDShHTZzOvCLSaFtEJxlAO7znkYIGaLhxpe9og81xf4H92yXP6Wr2aS+zoL8sGpmo9raq6w0Y0wt8UCWPmHmKfrjvYIqo0ye+bVvV4i+eDCXLu6dPi8x3uMMN3SqOYmsvZ7nXrfEwzewP2zilCuDGKdtDssytDQHzb+APq+3UrbtLDkrIjN2QV6dpJ+Ohwi1EXcMY81x70d/GPQ+BkGYqhn23k9YeqcRQEpbMVpH+rxqBtl0ea+TwNkanjZW99eEA6hGd5m+DByt+HmnIXXJWwXkk9/hG262Tt06E1R6PItr0OLRskPSiTtNsX22werDV3fer+BnZUvu8pDDMMzrQ6yPDfIU3UIt9KEVK0n3ST8qByDq9G0G/2F9FlafG0ytn5iloqS/OYg3fFsuNs0JdREHyxSH5SD9w1huXt25Rp1WABf8NhxyaJ2gHLfno4paFTNQq1IvFy8dqwlWN6zL/DANHxujh1JHFylfe1PxeQ8zzPe0A3QXmok2XtWWnkgutByMZJRjqmp6lS+ahgKAdqoDhvhz3gSzB3o2BQ4B+nuhrzzRwq54P6fSR2bUQjV9V8jZtCLR2H9oNdZFbub1mDmZZfiOUI5VafUtMFtRGaYOFOY5G7bzdbuWQOmr8+oltOA7P4T7rO35NXqbA1sdkT5srn8AnpB15u7lur2Xm0vbvUPchqfeWiD6PATiVcdXA3pDinZyrWg9AbWXGTpV9tPggxhLxNgYWyqrziCahk4VJ1OS3QJYnIdXsnhEJKU5qjoR2MN6CH4Oxaea6wDNR1x+IWomxF/L/jY2J0lXK7NVKtRzYj3pfmg3VnZCH9pZqBb0Y7bPdH0Oq/jh2Ir3015KeW5Vg1vKWvI/hmcoaTZ42Dw9T1Sj9Zn32Qc+yDW39NYssc9sB4gmvEgPVEvajcS5nxM3MyNsOD3ujHvAqfd8fmKuyqjvAsr3h7/3hLjYdLEA/ru/uOCmjpoSTvLuCXNAEzzB6UYJRQ193273Ht/iFdNq1w2idefoQbaYGVht/aeq6ZFWoMWqBvjVBv4WbM9VN56MdD/gYS928cfcLeA60RLUCHUP28zUP/LWoGxVyjbvbCv9afVZ7G+2tgzqvjFmp5SuklSDjk4H6JOuXK1xLk3d+Z470Bi9j197lauZF/byHO2iRKhxBtlnjmyxLc7NKm1+3o333LKXe2esa7v3OstI6OjaSXoRYmVuFLpNQ4A6YR2Njl+b9Es/BkNx91C33/IFzkVXkC5E4ZQhcsibmvBufZjxNICFj5NiSbt8Unp/ecAibWaFBY6DAzcps08nVmaImuevtZSOjsOwS2NnfIurD+2M+YYbO766Ob1ErNxJyfYUvp/YPNiIy+h1TRWldyMcEtbwPgr4T5vZ5tZrq9w5mp1m5CbPbwHAwEjruSaqYa5lV5GXC9R71jPlKO5i3oR6HmbSBaXe/cGiZd03pZ8WuAmqmJwLow0tCINVlQrhyatYg5G1d1UoftKbcJ3cdk6FwCu7KI369swt+0d90488DDbulnEUrmA6umcGHyFVdrD2rDVDO8rpBn2V2RrndNE0lzMOIeRWYncoi+7oJqbBqr6xZ6NR0IWCyizTMZYH67ipy2X5wOfecl8oVetEw9G+dz6suFrvaMztV2XexZBMj6j6kUyrpxjAmklbsmRcJwDmMSoVLYg1cc6gquTClvxxXXrD97cI49XYeiXqen37a2RDiMiac1Tp2izAR4Up1+NV7d406TnBUqrJ0U+QBzKoZ6wVqmZPSDEr0dXbPxAcjU8YKgWGMBsTOA1vTIbVXz84m6048lCqtVhtEVRwj8W0dUJ+HIGpG7aeZ2B6EumB+Gu9eeruZMKexH02/pI8uq8FKmGoFVjaxxUmcvFqkqu6Sfr6V0SAC84fyp2AVeas5iFoyADXbJWIvzqkR10NAks8NFdHJ5B7KNRwNy1nbWdJ5Flpi8UzVqOpphgKECfG2yBKvV+mOJWhAmjvLoib0yf4jKi3QmWr8TEVmzLJ8lX4MUasLSkoxYr6ICzaUNKsvT6E869jTPzJSFa2CR9lvomOpZKRDGwpYdYO3LDdX1m33MqtCGpPrw1L411TYq8zIdK7qssqYFbH4SZ1WeSDP5+7aZljoNPOxRN2eZw0h94iijh0ezP4bai4Yd+ZLKGSoVcQB1F4Ksk+vrdviKi47mBRyJzu2wCjNEYp7Sd8FzEHOLPS427a+ppBudMmdJMX0zOYKNaixfkb0H3dJOdNW5Y3D3mQIYKjSoYAyRoOM5WetpqhflhNG9m6h0QprRfoJGnb6TccwNNzk+TG0TuYP9QK0wsnJTqtmbpX5/zJ6xG1o8CC9i88gomEqfXdIoN3M9h3ZGRW9xdh5dljk83kZs6C38fva8J29Dd0JaqioQcOZAVFrUygmhm5VkI/pFWrmGuY8Ezsn1gH1yJfSmmUhKFgowa2igmzcBkD7Sw3Ye9pW0uF+j+/hr/MhsXM0vGUUsBwAtReXMvACHwjtG32ikIsJ6N1COfhWTWZS8wDbakeXZZTUsdeDJGKm5aYdmemD1AMExGzdNoQlkLNxl1CtaW2YBbZAvBof6ZelFkLLL8tswG/TN8IaKSfVRyr/FeEHlcO4qbMBgl65h1M1sjx38uaDfF6nGKDup77xlMy0CS1WBK0cjYOHudMUyppxy8FJfVQdb9LrTuvn5F2LtGJLfuOK/ieOvN/3/6ZytDQlYsWNmvUe8KamduPcV66QvPtgFNyVzs6RMCxfUxqGA4pcoC2mqog6WfeWpSa719urr1H59WuES9sxtbHHrvXVantRPI3wTD1l7DIspsgFAZN7WPbEF1oG8ctH5Qv6aPtljhGh5W7l060BNpO7hgTFqQKmG0tjo9G+JlMbznWD+NWxVL2bjt+xUyVQoefRZhf+WGnk+ZTpXdXy5xZ5m2dVkz4sFKlwgaM21dVpj4BW0fi2INtAmMA+of2BiYIvwePD/DGVAw/p6itZL9x6yFFppkt+0OSknxu+yqGATW3ZoRCDRG8Yjef5HI2rsFjfDmPMPZ2q0465mlQ1WrwWnjCVa3KGtRWvTJlrXAn4jeHtpJg0QHIF+m75t5OEzAR0yYS/r+D7Qv8EmyTxLyd1ySmZVYhoTrYkTLo+3r/LH4yMAC56OIz+XKeMDd6MxaEbFcld3bavANhI+qoTMWMJ58ZCjVscxmS3FHRNrpKrEKCiS0YTDGj7ymq6EvEg/6Vhhqm+npYosu9O4q6TV1awhknWshpkI4UpWQkVmd5UrYbDaa7Jh10YPKLKLrX6CrTasFRS8uLRJsh6w/RYpkabKZdXXp3oEXP/+RwXY8WQGZtExgwINJJ9Fcz1shQTWAllF6BKpzW4uhgw+fVKp9luSP5sQpVIHXq1LkYFCzVoVR9kTR2TTxm7+/r7z0CDp3vlp88x/Tjnp52NFXzHpsJVuqlZJnKlMvUqJjrnF+pxbfK8RGyIEbzOBCLNbq4sTDeQvVUxx3SbM82K98buumHzoqKWY6/+5OpYCWAtZgjxIQ0h4t1Q05X8yizMYNRzR89qnyznKlmrcTnJqOCzty3PCjaIhWY9NtGA9YKbXoWFpyyuhzh8mOYN9uOe+WmjylZRnLdB3Dh1AbRsBFWCygGCakoTxlyYtmY/en3txpflhEJakKnwGLU6pJQ860TUFmszVt1jZX/r9qeTDzMmxlfvjPTcsr4jWy5aU7J0aOqxdw4240T1OAZ50tqRHjz4sAEI4pZ6mMUkDwlT0i59i7qR1QCgFGmuAIj0NxQwCs1xn3gYOe3Xnk6stzArKYNob7MpE2guDACXaVvYCpU8ozqUMHeMtgaN15hMQwxMqbrYZUf3kl0L+sx32V6L2qi1ib15YQ7DZMpEs6/a1wyK/EOsffrY3pnlre3YRlHY3ceilqCNheG0bWFiJ0LsR6j2TJfaovEuo6A5+8vcpJFS+5JV+mJ5hFq83O75xlKzM1K/fAiNM7lAPI5t95J4U+SLgdixTg6K4s1ti4od55/XrLjUOG8bFe43ZuxvNBJ1c7TJ5Yifl6/0uhFArhZNKnqxkOvKhYhme42ajxE3D4M3e3WUtxUHCJTwzfLQJInYQLXXohhYWrjVavK1Lu4aaVzHqm1p9pV6wvlgFwJst3w4c4YFKR/tnqF68D7QlNVXbizVHqPdNWfawmvGtk3SD6+SC5/er9lZJU8O0KdW78r318TJUYtibnfyjL3Tjwm1oyfohv0e9auI4941ZUTtjrgWmHDDeIu0w+VZw14bX5xvyPTjbQpB8YdXw3WmGri8DAsWF+6QMRyKCQcEt/mgwVudREjqHuyjtslVZ3ps/u7VpIILak05ddbUySuvAFbN+XYDeIZ1JAgaaP2D+mycZ1f/VQRwnKsUN4GA48xUJl8uCuA3SmfISuQmir+yfuq0znLGsh+2IbCFfc0eJqkOi2Q6hxC8MBfQV/YDVRqmWYlplw3jWxAoT/J0heyIQHx66S/v5kWDuPOgKMoWcD9SwQwH85EAWqljPzgdHMReGxPeDYjwLN7Zowoq9EzRdMCUcL4g5hbUxrRxSvYpQGAG5NisbqdwQ6Xuvu9DueD9GKZT6pGGGkcSr1sLcpwSoBP07diOn4XsZPdBt5gUJBg8bu0YDZ2xLQ/llFkQ7JpTOobe0FEj380N//Ys7buLBSPY1/32/cQo52MUw9CVF97P/YRGqOPygdiXFzZqPF4Nb/Fc2q/sgETg1sUOSKCq7AJzFCjVw9F/g8Lu0/dTw1/UPEgZ1/XY8Vx9MFCLgy0VVhP51b/vibrQWrVQOWfbZj3X5BYzZ7B6UFj7FBgTCwFuYxnqFvtxaGHKX9Payi6/w7wF0Be6XO0b4Co0JZ/GCZH0JgBj7+Scfx67TjVfwhZIE9rcjoe4Het2VpjFasgvueu16qw6qWA4p0LYYK/0mL52Cq2uIeNObGMe9SuLbKRvJjTosf/OvIe95aKbETRj9Vit2NqMFFqbArnXq7Cd9gjZ5Za72IfraTtG2reJ/dOu/RKHtfKG41ox2VSa/S3iVPHLATq829ljyCpkmYoFd8mrnOc73QZZiKBZG3Zj/vy5ipFMNggMLxz2o9AX9qo1hx28Jq70+GXDBMee+b1RoLiVaXMMJU7n6usmlnR7PPLnXa/Jpz0BO82nsqZ9B53LTBjf/y29DnfrOD6aptkUf0PUVC3o8aBCaxxn0ND+0r/0fKNp8uKQHDQTULphHiliY0DD7pXVF3+tG84cz+x7guAOyY5bvJi6ia7afrWUNFtg6YiWDbyAV+TbMKDklp1AQ53BBdrjUcVk7X4j6IGR4k3Y1XL4AudvGJ+A82h/jS0zIZklC7fantztEeQs64mFRnuAjTMaFfaiRF1yT0kPHBhx5a2C7GN3tvPLnU1n6odc3i7MA3g/TEMQ7+rynCZiuE2F2bEzKB5DNr9LEqujiOlqrPoHxAx0wHbgeWraJca/cmmaVOU99abi7KTWa5RNujiUD+PYGdP+D4UbR+gzEzZhBciVTa6y2/P+rcNhgi3dLsry3I8LUjhPxBKdh3psxxYfs9mAwG5AIk+kgr6GmeRwjmN/YEa6782B4wegLIpCwmSTRlxGly/V5iGHfzFtrHcwhm6DYsRJk/Xna4/4lt1GwyN1RYM3jzE4DZztF6FrA7wcC6ogQXW3q+2e2XIFKIzRndEKMRCDNsY4uSbeiX0h7v0mFbHMTvH9WjnwMLJd2OSPNr0RNlwjo0T8GgfO1JagGcp0VowVKWzoU47pmpYpHbJFF8ffMwebB1JzHZPosbTb51p1w7mSVSg8VEM58B7+aOPO1+TxRR29js682MwpG7VxBUmvQso6lbOnfjBFh5+oNdp8BxUL6xFgVqqwA/UUZ/jzMBw3LhyIJ29/TqEczXxM60ABBbl/B/nj1Q2kDl2FiGqMr0NOFxZkW8iR7N0qLqhpPH2piwmRVpyLomUQxrUwyS/g52yDMIEgg2tCU+JIThqs9JaTn1Qos50kzdJqZ39skZENAYJ945TsBJrWg+kgWI5Nvd1+qffB9sHjlLBpwVaowHjS0sKwQxRW6KIuI/60ExnNGT0NbMifvAsxG1UeEFmMSy/DQlem739wY2mcuO3WAL0Z1yv5QGjAmbbe76dSBXW3DuyIGoyrPKlkHsaKh7DOi5sHXEjZmby1CQPKWF4hR22J1KX4afwtFllOigR+dD+knUIxrtSM1mPlHjJ1uapeEoo9qfJMCFwg2S7sc3MMHYW6YoWDe9PCRks+lek/r4FtU8mVeEVBMtpMaXKLSR6HzlqjhYA/uJRunhB+THqAnif0mVnnRCLnEvmWgT4xnVrZfeHILUofQkmtDEq6dk22Zwq18uUhAenrhPkANQ02TTQWtEvOh4gmnUC3ydMPLz0dv5FrBRAHzHVnlwnq+J9ZeaPzyaNXMffRburQI1mMhRnCPdFCw5jva36Plc32YZ0N5O1DNkLLFWZusGUcYJMf3to/fRuLGY1p52wvS6hB1Cx5cWmGZyH3FBI8lQKVVrs+JNuWwSbcRcHkJDsm11XHWXsfZn0gaO/D6gr+57hWwM/xQRZySrb7U4LW2Es5T36y8uJZ62JTFOCzKiL9OBZlw1SFGudFb+FNTyBLFXhdHnK1jsmfsGrOq8iullLEtDn3kfiw6ATRoZt6JESYfsjgWe0dmMdeQKqr3yPLyzPImiustCMCb7TC+QpFgqKhQ4/TrsWJGpIVno4yZr+qkBATUYG+hB6YPC/ZY5l5LmZh3dA1+Xhfn4twLH4ENafbZuKnumL9Zeoeo2A9C3QcyM5HBYSCgCqDmTJPBjJei36SlKpQwL85mDVO8ErkHEyaI++8ybmQhC/HbvWxfv9cM2h5+xP6sVxpVPrRu2jDB18fZoQ7ccY6/woBuwd7q3HW2qoeKXHDPLMf+TPpV1tVRRiHm8MA95A/ZFG90yx/yKflUbR4a+1p+JOrQDU4vl8UupSWNXFJzpg8x0EsOc9f15uraUg8tUiWOXfEtzCfSC7XzOuBfNjB6NNli/oE+s/sW+1C61xH0EvGtFo2CIdrYeIvcr3mZvjBXMfrzbQ2oahvwp78JsVQaY64/1Ogw02xBH2+ibrTKyCrFLyuLMW/p3ZgFzeBaLeYGEvUGRLwsCpoHrb+ZCEavOdfW9H6SNCm/s5rA3OloUqQlCKWC71Aj3PJrg5rdEJ9sKGfOfFAtvvvg/aai/5TuMcJfoLefwdy0wEzHNBmXE+h7V1MrMZYLz3uQyezCekBfbqE2JV93v4h6M7+sNXQ+pL7eBCb7LxazUo9J0j5xbPGLVniH7eXiOM7ncLIPKUmMJcB9KWmVSzCps7N57D3KrL8CUHbcXPJPWhC44/ufH69XJ7/s23G1lkh//3VDk6YE4Kufo8a3YSNK0HU+zrudY5WDvaXy4mFOmnt6/XZdefk2+tlfzk7ruVvf0A77DSvP86jcdtmmXN/h/eb19e25Yb985cvX86burJqRWCS0lbMXHa/TmseIGr2EkC5VYdpfDYl3QXadrE12HDHZr3RS9aDtS1MOUfjYOE57bx7TJKnP0YcliPMV8ji/jQjrOi15l7TOjT20mQM2lxkJkmvtg/aSchWnMD0jVswoQD6OIhmm3ETC4udV9tplboe2Hhn7+0PuMF5al8sr4w7ZJVAWBYWNbC4t2oQmXWa5mMVNshOI1QgsFNrz0AeZfVRH11tPnrERDov5w/yBt079YGlfkwORhPNLDQNr8/jMtmxhMStGrbWHD+7iPaRV3nyYhLNgNmHaZtxqwurB8qAMLs/3OD2nuPTfLdBw1zfVY4YYyXaDNmFKoEGSYrqakYDT+w3541r3Eb7WKxyNJzpghpVsYNIW5G1N0fUm8HJlM/YimeHgDK8AvM8ogCaAl5Cqi7azGW/pxzjGexn9Y5l3ANLkf36bfrujeJt9gKH0p2pWPFoR3pCcTdpZMk+VYE38qZzwUXVxSjZgilDm5lh7pFZHw54v8N6sVLse7x/ObgSTqN96m68/w4vt37ZI9w+dFaQ1WZTU/k3z4sumjSMT2WrwGOnJlltztPnRIVMCV6nzczlsIZYnuJyxLDkzPb9d7NKX61dLEv7Ize0Vm6AH2kAvKHKbOy+XGTf4VGasHjRr/C7mTrNz0zqtHasMytqZz3ougVl3sxml0Xa/roNQaoQUuy2i4u7PuexOPem2UPoR6NGMeWVWup5FVFDc9kpmitc5+KipaDr0UYzOXi0X1mjmHfMXVnggPd+PI/Tdr+FhJcCvv+eLqmRhR83A8cQSnfQj2PD7opx8aI2AuZpqe2WU+A3aLG5HRPXhd6UH3U09Z/MUmVOe+mik9slvVyfwThLOmXt7U34qCfVbUJ/O8x1lpXabgPUy4ZYhiNu+TES6TftxNLnC4QKM5eG8RK63frDbqpPbrSdwtnPAsiPMlM2oaiT/qmjwfPcHVqpJdgsOq3CCObVUhczft5EmHuFdofPlPpLH8jwZ4nregciZbh8gLxUOQ6wwuEWtXnIF5WZc3QpNHhD0GuOjx2h14+PfwrsHy1z/nSOX6ultEKUbRhFp57x5gr1imtErzDzxCYvtqo0Y2q0iehm6uQHoH7am/eHIY0+hWZtK34MVDBXFL5k/VG9PH1uTZh/Dh/20+NHeaUUdLL7EwmkH3r6u7Z6tq7MfzWu0ofStIf3qIfwLyrTVe1ygfHiFH7+eFpuYE3+eBn8x49d6LJ4W4fVb2EpYBfHZYrbT1b6op5r9ZoF1hEWsq0PEvRL8rMePUw0p6JsHWozjroNxqBxmY3awdPF2LfRv7NlZ+R1oksVzfbP+1hQLbap2wAYMIcwjNERNXdkLXZ9fOuoy4PmO5gyqjfT/mR+XMmT/esY/uTj6SvdotaAbGoVzO7igJn6chYzpM9SZ7CL+2k02/YTka7/Fx+a8+c/I4jd4YC8CU0L62nQ8CkUIU0V6419FdT5X3PnwFs4uj6E5H8ZdGf/wmVWrtE49studzWD/kuYTeLs6yq9MBq7/VjH+50GZaqawUn/l7XD/iWl3miF4Qc3we4j6leNGHyETIs9h9z+iJX+ew/jJ2Lq+UF4mvRqiTlJHj/7tv9Ln4Js77is33ChF47am/0bLcDfIOlP/+mFsubesWkPzN+N+b/wuXlWnzzi3NH+678jzP8HwGwZVpoknq8AAAAASUVORK5CYII=";

/* =====================================================================
   SITE CONTENT — edit everything here.
   This is the only section you (or I, on your behalf) need to touch to
   change text, add real venues, swap photos/videos, or fill in your
   real contact details.
===================================================================== */

// Leave these blank until you're ready — the site shows a friendly
// placeholder until they're filled in.
const CONTACT_INFO = {
  phone: "",
  email: "",
};

const ABOUT_PARAGRAPHS = [
  "MarriHeaven is a dedicated wedding event organizing company committed to turning your dream wedding into reality. We work closely with couples and families to plan, coordinate, and execute weddings across indoor banquet halls, outdoor lawns, and coastal destinations.",
  "Our team brings together experienced venue coordinators, decorators, photographers, and planners under one roof, so you never have to manage multiple vendors on your own. Every recommendation we make comes from years of working directly with the venues and artists we feature.",
  "We hold ourselves to one simple standard: every wedding we organize should feel as personal and unforgettable as if we were planning it for our own family. That belief guides every venue we choose, every vendor we recommend, and every detail we oversee — because your day deserves nothing less.",
];

const INTRO_PARAGRAPHS = [
  "Finding the perfect venue and experiencing your wedding exactly as you imagined it — that's what we're here for. We help you discover beautiful indoor, outdoor, and coastal venues, each handpicked to reflect a different kind of celebration.",
  "From your very first venue visit to the final farewell of your reception, MarriHeaven stays by your side — coordinating every vendor, every detail, and every moment, so all you have to do is enjoy your day.",
];

const QUOTE_TEXT =
  "Marriages are made once in a lifetime — so let's plan it together and make it truly unforgettable.";

const STORY_BLOCKS = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    text: "Every love story deserves a setting as beautiful as the moment itself. Whether it's the warm glow of a decorated hall or the open sky of an outdoor lawn, we help you find a venue that feels like it was made for your day.",
  },
  {
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    text: "From the first walk down the aisle to the last dance of the night, we capture and craft every detail — so years from now, you can look back and relive it all over again.",
  },
];

const TRUST_PARAGRAPHS = [
  "Every venue we feature is personally reviewed by our team, and every wedding we plan is handled with the same care as if it were our own family's celebration. When you choose MarriHeaven, you're choosing a team that stays with you at every step — from your first venue visit to your final dance.",
  "We believe that no two weddings are alike, and neither is our approach. Every couple we work with receives a plan built around their own traditions, families, and vision — never a one-size-fits-all package.",
];

// Hero banner shown right below the header. Swap HERO_IMAGE for your own
// photo/video whenever you have one.
const HERO_IMAGE = "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80";
const HERO_HEADING = "Your Wedding, Beautifully Planned";
const HERO_SUBTEXT = "From the perfect venue to the smallest detail — MarriHeaven brings your wedding vision to life.";

// Qualitative trust badges — intentionally not numeric claims (like "500+
// weddings") since those should only go up once they're actually true.
// Swap these for real stats/numbers once you have them.
const VALUE_PROPS = [
  { icon: Heart, title: "Handpicked Venues", description: "Every venue we feature is personally visited and reviewed by our team before it's listed." },
  { icon: Users, title: "One Dedicated Team", description: "A single point of contact from your first venue visit to your final dance." },
  { icon: ShieldCheck, title: "Transparent Pricing", description: "Clear budget ranges up front, with final pricing confirmed directly with you." },
];

const PROCESS_STEPS = [
  { icon: MessageSquare, title: "Share Your Requirements", description: "Tell us your wedding style, guest count, and budget." },
  { icon: MapPinned, title: "Explore Curated Venues", description: "Browse indoor, outdoor, and coastal venues that fit your vision." },
  { icon: CheckCircle2, title: "Confirm & Celebrate", description: "Lock in your venue and let our team handle the rest." },
];

const FAQS = [
  {
    question: "Do you help with venues outside the categories listed here?",
    answer: "Yes — Indoor, Outdoor, and Coastal are our most requested styles, but our team can help you find or arrange other types of venues as well. Just reach out with what you have in mind.",
  },
  {
    question: "How far in advance should we book our venue?",
    answer: "We recommend reaching out as early as possible, especially for weekend dates and peak wedding season, since popular venues can get booked quickly.",
  },
  {
    question: "Do you only help with the venue, or the full wedding?",
    answer: "We help with both — from finding and booking the right venue to coordinating décor, photography, videography, makeup, catering, and setup, so you have one team handling everything.",
  },
  {
    question: "Is the price range shown on each venue the final price?",
    answer: "The price range gives you a starting point for planning your budget. Final pricing depends on your date, guest count, and choice of add-on services, which our team will confirm with you directly.",
  },
];

const WEDDING_TYPES = ["Indoor Wedding", "Outdoor Wedding", "Coastal Wedding"];

const SERVICES = [
  { name: "Venue Decoration", icon: Sparkles, description: "Traditional and contemporary décor themes tailored to your venue and vision." },
  { name: "Photography", icon: Camera, description: "Candid and traditional photography that captures every meaningful moment." },
  { name: "Videography", icon: Video, description: "Cinematic wedding films and highlight reels you'll treasure for years." },
  { name: "Bridal Makeup", icon: Palette, description: "Professional bridal and family makeup artists for your big day." },
  { name: "Wedding Setup & Planning", icon: LayoutGrid, description: "End-to-end planning, timelines, and on-day coordination." },
  { name: "Catering", icon: UtensilsCrossed, description: "Curated menus and catering partners for every guest count and taste." },
  { name: "Mehndi Ceremony", icon: Flower2, description: "Skilled henna artists and festive mehndi setups to celebrate the ceremony in style." },
  { name: "Haldi Ceremony", icon: Sun, description: "Turmeric ceremony styling, décor, and coordination for a joyful haldi celebration." },
  { name: "Pre-Wedding Shoot", icon: Aperture, description: "Couple photoshoots at scenic locations to capture your story before the big day." },
  { name: "Wedding Shopping Assistance", icon: ShoppingBag, description: "Guided help sourcing outfits, jewelry, and invitations from trusted vendors." },
  { name: "Guest Hospitality", icon: Users, description: "Accommodation, transport, and hospitality coordination for your wedding guests." },
  { name: "Post-Wedding Services", icon: Gift, description: "Album delivery, thank-you shoots, and wrap-up coordination after the celebrations." },
];

// A quick visual taste of what MarriHeaven covers, before the full "What We
// Provide" section below. Swap these thumbnail images for your own anytime.
const INSPIRATION_ITEMS = [
  { label: "Décor", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80" },
  { label: "Photography", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=300&q=80" },
  { label: "Videography", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80" },
  { label: "Makeup", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80" },
  { label: "Venues", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80" },
  { label: "Catering", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=300&q=80" },
];

// Sample placeholder venues — replace with your real venues, photos, and
// videos whenever you're ready. Add as many venues to each category as
// you like by adding more objects to the "venues" array.
const CATEGORIES = [
  {
    id: "indoor",
    name: "Indoor Wedding",
    tagline: "Elegant halls and banquet spaces for a grand celebration",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "grand-mandapa-hall",
        name: "The Grand Mandapa Hall",
        rating: 4.9,
        priceRange: "₹4,00,000 – ₹8,00,000",
        photos: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A grand, air-conditioned banquet hall with seating for up to 500 guests, a dedicated stage and mandap area, in-house lighting, and ample parking. Popular for traditional ceremonies and grand receptions alike.",
      },
      {
        id: "royal-crystal-banquet",
        name: "Royal Crystal Banquet",
        rating: 4.9,
        priceRange: "₹3,50,000 – ₹7,00,000",
        photos: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A classic banquet hall known for its crystal chandeliers and marble interiors. Comes with an in-house décor team and a private bridal suite for getting-ready photos.",
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Wedding",
    tagline: "Open-air lawns and gardens for a natural, breathtaking setting",
    heroImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "emerald-garden-lawns",
        name: "Emerald Garden Lawns",
        rating: 4.9,
        priceRange: "₹3,50,000 – ₹7,50,000",
        photos: [
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "Sprawling landscaped lawns with a floral mandap area, string-lit walkways, and space for up to 400 guests under the open sky. Includes a backup covered pavilion for weather flexibility.",
      },
      {
        id: "courtyard-estate",
        name: "The Courtyard Estate",
        rating: 4.9,
        priceRange: "₹4,50,000 – ₹9,00,000",
        photos: [
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A heritage-style courtyard estate with stone architecture and open-sky seating, perfect for a royal outdoor wedding theme. Includes on-site guest accommodation.",
      },
    ],
  },
  {
    id: "coastal",
    name: "Coastal Wedding",
    tagline: "Barefoot ceremonies by the shore, with the ocean as your backdrop",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f29c1fe8ce?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "golden-shore-resort",
        name: "Golden Shore Resort",
        rating: 4.9,
        priceRange: "₹5,00,000 – ₹10,00,000",
        photos: [
          "https://images.unsplash.com/photo-1519167758481-83f29c1fe8ce?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A private beachfront resort with a dedicated ceremony deck facing the sunset, in-house catering, and guest rooms overlooking the ocean. Ideal for both intimate and large coastal weddings.",
      },
      {
        id: "azure-bay-lawn",
        name: "Azure Bay Wedding Lawn",
        rating: 4.9,
        priceRange: "₹4,50,000 – ₹8,50,000",
        photos: [
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A coastal lawn just steps from the shoreline, with a rustic wooden mandap and fairy-lit seating for evening ceremonies. Sunset time slots are the most requested.",
      },
    ],
  },
];

/* =====================================================================
   COMPONENTS
===================================================================== */

function VenueMediaSlider({ media }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= media.length) setIdx(0);
  }, [media.length, idx]);

  const current = media[idx];

  useEffect(() => {
    if (!current || media.length <= 1) return undefined;
    if (current.type === "image") {
      const t = setTimeout(() => setIdx((i) => (i + 1) % media.length), 1000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [idx, media.length, current]);

  if (!current) {
    return <div className="no-media">No photos or videos added yet.</div>;
  }

  return (
    <div className="venue-slider">
      <div className="venue-slider-frame">
        {current.type === "image" ? (
          <img src={current.src} alt="" />
        ) : (
          <video
            key={current.src}
            src={current.src}
            autoPlay
            muted
            loop={media.length <= 1}
            playsInline
            onEnded={() => { if (media.length > 1) setIdx((i) => (i + 1) % media.length); }}
          />
        )}
      </div>
      {media.length > 1 && (
        <div className="venue-slider-dots">
          {media.map((m, i) => (
            <span key={i} className={"dot" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function QuoteModal({ onClose }) {
  const [step, setStep] = useState("form"); // "form" | "otp" | "thanks"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [weddingType, setWeddingType] = useState("");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const isFormValid =
    name.trim().length > 1 &&
    /^[6-9]\d{9}$/.test(phone.trim()) &&
    location.trim().length > 1 &&
    !!weddingType;

  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return undefined;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendTimer]);

  function sendOtp() {
    const code = generateOtp();
    setGeneratedOtp(code);
    setOtpDigits(["", "", "", ""]);
    setOtpError("");
    setResendTimer(30);
  }

  function handleSendOtp() {
    if (!isFormValid) return;
    sendOtp();
    setStep("otp");
  }

  function handleOtpChange(i, rawValue) {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < 3 && otpRefs[i + 1].current) {
      otpRefs[i + 1].current.focus();
    }
  }

  function handleVerify() {
    const entered = otpDigits.join("");
    if (entered.length < 4) {
      setOtpError("Please enter the 4-digit code.");
      return;
    }
    if (entered === generatedOtp) {
      setOtpError("");
      setStep("thanks");
    } else {
      setOtpError("That code doesn't match. Please enter the correct OTP.");
    }
  }

  return (
    <div className="quote-modal-backdrop" onClick={onClose}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quote-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        {step === "form" && (
          <>
            <h2>Let's Start Planning Together</h2>
            <p className="quote-modal-sub">Tell us a little about your big day, and one of our wedding planners will personally reach out to you.</p>

            <input
              className="quote-input"
              placeholder="Enter your name"
              value={name}
              onFocus={() => setTypeDropdownOpen(false)}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="quote-phone-row">
              <span className="quote-phone-prefix">+91</span>
              <input
                className="quote-input quote-phone-input"
                placeholder="Enter phone number"
                inputMode="numeric"
                value={phone}
                onFocus={() => setTypeDropdownOpen(false)}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
              />
            </div>

            <input
              className="quote-input"
              placeholder="Tell us your event location"
              value={location}
              onFocus={() => setTypeDropdownOpen(false)}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="quote-select-wrap">
              <button
                type="button"
                className={"quote-select-trigger" + (typeDropdownOpen ? " open" : "")}
                onClick={() => setTypeDropdownOpen((o) => !o)}
              >
                <span className={weddingType ? "" : "quote-select-placeholder"}>
                  {weddingType || "Tell us your wedding type"}
                </span>
                <ChevronDown size={16} className={"quote-select-chevron" + (typeDropdownOpen ? " open" : "")} />
              </button>
              {typeDropdownOpen && (
                <div className="quote-select-panel">
                  {WEDDING_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={"quote-select-option" + (weddingType === t ? " selected" : "")}
                      onClick={() => { setWeddingType(t); setTypeDropdownOpen(false); }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="quote-otp-note">We will send an OTP to verify your number</p>

            <button className={"quote-submit" + (isFormValid ? " ready" : "")} disabled={!isFormValid} onClick={handleSendOtp}>
              Submit
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <button className="quote-back" onClick={() => setStep("form")} aria-label="Back"><ChevronLeft size={18} /></button>
            <h2>Enter OTP</h2>
            <p className="quote-modal-sub">
              We have sent a 4-digit verification code to<br /><strong>+91-{phone}</strong>
            </p>
            <p className="quote-demo-note">
              Demo mode: this site isn't connected to a real SMS service yet, so here's your code for testing — <strong>{generatedOtp}</strong>
            </p>

            <div className="quote-otp-boxes">
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={otpRefs[i]}
                  className="quote-otp-box"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>

            {otpError && <p className="quote-otp-error">{otpError}</p>}

            <p className="quote-resend">
              {resendTimer > 0 ? (
                <>Resend OTP in 00:{String(resendTimer).padStart(2, "0")}</>
              ) : (
                <button type="button" className="quote-resend-link" onClick={sendOtp}>Resend OTP</button>
              )}
            </p>

            <button className="quote-submit ready" onClick={handleVerify}>Submit</button>
          </>
        )}

        {step === "thanks" && (
          <div className="quote-thanks">
            <CheckCircle2 size={44} className="quote-thanks-icon" />
            <h2>Thank You For Consulting MarriHeaven</h2>
            <p>We will make your marriage unforgettable. Our team will reach out to you shortly.</p>
            <button className="quote-submit ready" onClick={onClose}>Close</button>
          </div>
        )}

        <div className="quote-modal-brand"><span className="diamond" />MARRIHEAVEN<span className="diamond" /></div>
      </div>
    </div>
  );
}

function navClass(view, type) {
  return "nav-link" + (view.type === type ? " active" : "");
}

function Header({ view, goHome, goAbout, goContact }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={goHome}>
        <img src={logoImg} alt="MarriHeaven logo" className="brand-logo" />
        <span className="brand-text">
          <span className="brand-name">MARRIHEAVEN</span>
          <span className="brand-tagline">Marriages are made in heaven</span>
        </span>
      </button>
      <nav className="main-nav">
        <button className={navClass(view, "about")} onClick={goAbout}>About Us</button>
        <button className={navClass(view, "contact")} onClick={goContact}>Contact Us</button>
      </nav>
    </header>
  );
}

function HeroBanner({ onExplore }) {
  return (
    <section className="hero-banner" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      <div className="hero-overlay">
        <h1>{HERO_HEADING}</h1>
        <p>{HERO_SUBTEXT}</p>
        <button className="hero-cta" onClick={onExplore}>Explore Venues</button>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="value-props-section">
      <div className="value-props-grid">
        {VALUE_PROPS.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="value-prop">
              <div className="value-prop-icon"><Icon size={22} /></div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="process-section">
      <h2>How It Works</h2>
      <div className="ornament"><span className="diamond" /></div>
      <div className="process-grid">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="process-step">
              <div className="process-step-number">{i + 1}</div>
              <div className="process-step-icon"><Icon size={20} /></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="ornament"><span className="diamond" /></div>
      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className={"faq-item" + (isOpen ? " open" : "")}>
              <button className="faq-question" onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                <span>{item.question}</span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CornerFlourish(props) {
  return (
    <svg {...props} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4,4 C4,16 12,24 24,24 C30,24 34,28 36,36" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4,4 C10,4 16,8 16,16" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="24" r="2.6" fill="currentColor" />
    </svg>
  );
}

function CornerFlourishSet({ color }) {
  return (
    <>
      <CornerFlourish className="corner-flourish corner-flourish-tl" style={{ color }} />
      <CornerFlourish className="corner-flourish corner-flourish-tr" style={{ color }} />
      <CornerFlourish className="corner-flourish corner-flourish-bl" style={{ color }} />
      <CornerFlourish className="corner-flourish corner-flourish-br" style={{ color }} />
    </>
  );
}

function QuoteFeature() {
  return (
    <div className="section-band-outer">
      <WaveTop color="#3D0F1C" />
      <div className="quote-feature-band" style={{ backgroundImage: `url(${bgMandalaRed})` }}>
        <div className="quote-feature-overlay" />
        <div className="section-band-inner">
          <p className="quote-feature-text">{QUOTE_TEXT}</p>
        </div>
      </div>
    </div>
  );
}

function WaveTop({ color }) {
  return (
    <svg className="band-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,60 C480,-6 960,-6 1440,60 L1440,60 L0,60 Z" fill={color} />
    </svg>
  );
}

function SectionBand({ color, motifSide, children }) {
  return (
    <div className="section-band-outer">
      <WaveTop color={color} />
      <div className="section-band" style={{ backgroundColor: color }}>
        <div
          className={"band-bg-image band-bg-" + (motifSide || "right")}
          style={{ backgroundImage: `url(${bgMandalaAged})` }}
        />
        <div className="section-band-inner">{children}</div>
      </div>
    </div>
  );
}

function InspirationSection({ onViewServices }) {
  return (
    <section className="inspiration-section">
      <h2>Get Inspired For Your Big Day</h2>
      <div className="ornament"><span className="diamond" /></div>
      <p className="inspiration-sub">A closer look at everything that goes into planning your perfect wedding.</p>
      <div className="inspiration-row">
        {INSPIRATION_ITEMS.map((item) => (
          <div key={item.label} className="inspiration-item">
            <div className="inspiration-thumb">
              <img src={item.image} alt="" />
            </div>
            <span>{item.label}</span>
          </div>
        ))}
        <button type="button" className="inspiration-item" onClick={onViewServices}>
          <div className="inspiration-thumb inspiration-more"><LayoutGrid size={20} /></div>
          <span>& More</span>
        </button>
      </div>
      <button type="button" className="inspiration-view-all" onClick={onViewServices}>
        View All Services <ChevronRight size={14} className="inspiration-view-all-icon" />
      </button>
    </section>
  );
}

function HomePage({ goToCategory }) {
  function scrollToCategories() {
    const el = typeof document !== "undefined" ? document.getElementById("categories") : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToServices() {
    const el = typeof document !== "undefined" ? document.getElementById("services") : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="page home-page">
      <HeroBanner onExplore={scrollToCategories} />

      <SectionBand color="var(--band-gold)" motifSide="right">
        <ValueProps />
      </SectionBand>

      <section className="intro-section">
        {INTRO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <QuoteFeature />

      <section className="story-section">
        {STORY_BLOCKS.map((block, i) => (
          <div key={i} className={"story-block" + (i % 2 === 1 ? " reverse" : "")}>
            <div className="story-media">
              <img src={block.image} alt="" />
            </div>
            <div className="story-text">
              <p>{block.text}</p>
            </div>
          </div>
        ))}
      </section>

      <SectionBand color="var(--band-blush)" motifSide="left">
        <section className="categories-section" id="categories">
          <h2>Choose Your Wedding Style</h2>
          <div className="ornament"><span className="diamond" /></div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} className="category-card" onClick={() => goToCategory(cat.id)}>
                <div className="category-card-img">
                  <img src={cat.heroImage} alt="" />
                </div>
                <div className="category-card-label">{cat.name}</div>
              </button>
            ))}
          </div>
        </section>
      </SectionBand>

      <SectionBand color="var(--band-gold)" motifSide="right">
        <HowItWorks />
      </SectionBand>

      <InspirationSection onViewServices={scrollToServices} />

      <section className="services-section" id="services">
        <h2>What We Provide</h2>
        <div className="ornament"><span className="diamond" /></div>
        <div className="services-grid">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="service-card">
                <div className="service-icon"><Icon size={22} /></div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <SectionBand color="var(--band-blush)" motifSide="left">
        <FaqSection />
      </SectionBand>

      <SectionBand color="var(--band-gold)" motifSide="right">
        <div className="trust-section">
          <div className="ornament"><span className="diamond" /></div>
        {TRUST_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </SectionBand>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page about-page" style={{ backgroundImage: `url(${bgMandalaCreamCorners})` }}>
      <h1>About Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="content-card">
        <CornerFlourishSet />
        {ABOUT_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page contact-page" style={{ backgroundImage: `url(${bgMandalaCreamCorners})` }}>
      <h1>Contact Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="content-card contact-card">
        <CornerFlourishSet />
        <div className="contact-row">
          <Phone size={18} />
          {CONTACT_INFO.phone ? <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a> : <span className="muted">Phone number to be added</span>}
        </div>
        <div className="contact-row">
          <Mail size={18} />
          {CONTACT_INFO.email ? <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> : <span className="muted">Email to be added</span>}
        </div>
      </div>
    </div>
  );
}

function CategoryPage({ categoryId, goToVenue }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return <div className="page">Category not found.</div>;

  return (
    <div className="page category-page">
      <div className="category-hero-band" style={{ backgroundImage: `url(${bgArchPillars})` }}>
        <div className="category-hero-overlay" />
        <CornerFlourishSet color="#FBF0DA" />
        <h1>{category.name}</h1>
        <p className="category-tagline">{category.tagline}</p>
      </div>
      <div className="ornament"><span className="diamond" /></div>
      <div className="venue-list-vertical">
        {category.venues.map((v) => (
          <button key={v.id} className="venue-row-card" onClick={() => goToVenue(category.id, v.id)}>
            <div className="venue-photo-wrap">
              <img src={v.photos[0]} alt="" />
              <div className="venue-rating-badge"><Star size={12} fill="currentColor" /> {v.rating}</div>
              <div className="venue-price-badge">{v.priceRange}</div>
            </div>
            <div className="venue-row-name">{v.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function VenuePage({ categoryId, venueId }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const venue = category && category.venues.find((v) => v.id === venueId);
  if (!category || !venue) return <div className="page">Venue not found.</div>;

  const media = [
    ...venue.photos.map((p) => ({ type: "image", src: p })),
    ...(venue.videos || []).map((v) => ({ type: "video", src: v })),
  ];

  return (
    <div className="page venue-page">
      <h1>{venue.name}</h1>
      <div className="venue-rating-line"><Star size={14} fill="currentColor" /> {venue.rating} rated</div>
      <div className="content-card venue-detail-card">
        <CornerFlourishSet />
        <VenueMediaSlider media={media} />
        <div className="venue-detail-info">
          <div className="venue-price-line">{venue.priceRange}</div>
          <p>{venue.details}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer" style={{ backgroundImage: `url(${bgPeacockFrame})` }}>
      <div className="footer-overlay" />
      <div className="ornament small"><span className="diamond" /></div>
      <div className="footer-row">
        <Phone size={16} />
        {CONTACT_INFO.phone ? <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a> : <span className="muted">Contact number coming soon</span>}
      </div>
      <div className="footer-row">
        <Mail size={16} />
        {CONTACT_INFO.email ? <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> : <span className="muted">Email coming soon</span>}
      </div>
    </footer>
  );
}

/* ---------------------------------- URL routing (so the browser Back
   button works properly, like on any normal website) ---------------------------------- */

function parseHash() {
  if (typeof window === "undefined") return { type: "home" };
  const h = window.location.hash.replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { type: "home" };
  if (parts[0] === "about") return { type: "about" };
  if (parts[0] === "contact") return { type: "contact" };
  if (parts[0] === "category" && parts[1]) return { type: "category", id: parts[1] };
  if (parts[0] === "venue" && parts[1] && parts[2]) return { type: "venue", catId: parts[1], venueId: parts[2] };
  return { type: "home" };
}

function viewToHash(view) {
  switch (view.type) {
    case "about": return "#/about";
    case "contact": return "#/contact";
    case "category": return `#/category/${view.id}`;
    case "venue": return `#/venue/${view.catId}/${view.venueId}`;
    default: return "#/";
  }
}

export default function App() {
  const [view, setView] = useState(parseHash);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    function onHashChange() {
      setView(parseHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(nextView) {
    const hash = viewToHash(nextView);
    if (typeof window !== "undefined" && window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setView(nextView);
    }
  }

  const goHome = () => navigate({ type: "home" });
  const goAbout = () => navigate({ type: "about" });
  const goContact = () => navigate({ type: "contact" });
  const goToCategory = (id) => navigate({ type: "category", id });
  const goToVenue = (catId, venueId) => navigate({ type: "venue", catId, venueId });

  return (
    <div className="app-root">
      <GlobalStyles />
      <Header view={view} goHome={goHome} goAbout={goAbout} goContact={goContact} />
      <main className="site-main">
        {view.type === "home" && <HomePage goToCategory={goToCategory} />}
        {view.type === "about" && <AboutPage />}
        {view.type === "contact" && <ContactPage />}
        {view.type === "category" && <CategoryPage categoryId={view.id} goToVenue={goToVenue} />}
        {view.type === "venue" && <VenuePage categoryId={view.catId} venueId={view.venueId} />}
      </main>
      <Footer />

      <button className="floating-cta" onClick={() => setShowQuoteModal(true)}>Start My Wedding Planning</button>
      {showQuoteModal && <QuoteModal onClose={() => setShowQuoteModal(false)} />}
    </div>
  );
}

/* =====================================================================
   STYLES
===================================================================== */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

      .app-root {
        /* Clean cream base, deep burgundy + gold from the peacock logo.
           No page-wide texture — the color bands and one signature dark
           glow section below carry the richness instead. */
        --ivory: #FBF8F1;
        --surface: #FFFFFF;
        --wine: #8A1F38;
        --wine-dark: #4A1220;
        --gold: #B8935A;
        --gold-light: #F3E2C4;
        --ink: #211A16;
        --charcoal: #3A2E28;
        --muted: #8B8074;
        --border: #E7DCC2;
        --band-gold: #FBF0DA;
        --band-blush: #F8EAEE;

        font-family: 'Jost', sans-serif;
        background-color: var(--ivory);
        background-image: url(${bgFloralCream});
        background-repeat: repeat;
        background-size: 420px auto;
        color: var(--charcoal);
        min-height: 100vh;
      }
      .app-root *, .app-root *:before, .app-root *:after { box-sizing: border-box; }
      .app-root button { font-family: inherit; cursor: pointer; background: none; border: none; }
      .app-root a { color: var(--wine); text-decoration: none; }
      .app-root a:hover { text-decoration: underline; }
      .app-root button:focus-visible, .app-root a:focus-visible {
        outline: 2px solid var(--wine); outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .app-root * { transition: none !important; animation: none !important; }
      }

      /* header */
      .app-root { border-top: 4px double var(--gold); }
      .site-header {
        position: relative; overflow: hidden;
        display: flex; align-items: center; justify-content: space-between;
        padding: 26px 40px; background: var(--surface); border-bottom: 1px solid var(--gold);
        flex-wrap: wrap; gap: 12px;
      }
      .brand, .main-nav { position: relative; z-index: 1; }
      .brand { display: flex; flex-direction: row; align-items: center; gap: 12px; text-align: left; }
      .brand-logo { width: 52px; height: 52px; object-fit: contain; flex-shrink: 0; }
      .brand-text { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
      .brand-name {
        font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 30px;
        letter-spacing: 2px; color: var(--wine);
      }
      .brand-tagline { font-size: 12px; font-style: italic; color: var(--muted); letter-spacing: 0.3px; }
      .main-nav { display: flex; gap: 28px; }
      .nav-link {
        font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--charcoal); padding-bottom: 3px; border-bottom: 2px solid transparent;
      }
      .nav-link:hover, .nav-link.active { color: var(--wine); border-bottom-color: var(--gold); }

      .site-main { max-width: 1040px; margin: 0 auto; padding: 40px 24px 60px; }
      .page h1 {
        font-family: 'Playfair Display', serif; font-weight: 800; font-size: 38px; color: var(--ink);
        text-align: center; margin: 0 0 6px;
      }

      .ornament {
        width: 130px; height: 14px; margin: 16px auto; position: relative;
        display: flex; align-items: center; justify-content: center;
      }
      .ornament::before, .ornament::after {
        content: ''; position: absolute; top: 50%; width: 50px; height: 1px;
        background: var(--gold); transform: translateY(-50%);
      }
      .ornament::before { left: 0; }
      .ornament::after { right: 0; }
      .ornament > .diamond { width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); }
      .ornament.small { width: 90px; margin: 0 auto 16px; }

      /* home sections */
      /* hero banner — fixed full-viewport background; page content scrolls
         up over it and, once past this first screen, fully covers it since
         every section below has its own solid background. */
      .hero-banner {
        position: relative;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        margin-bottom: 50px;
        height: 100vh;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-repeat: no-repeat;
      }
      .hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(36,29,26,0.15) 0%, rgba(36,29,26,0.55) 75%, rgba(36,29,26,0.75) 100%);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 20px;
      }
      .hero-overlay h1 {
        font-family: 'Playfair Display', serif; font-weight: 800; font-size: 46px; color: #fff;
        margin: 0 0 12px; text-shadow: 0 2px 12px rgba(0,0,0,0.3);
      }
      .hero-overlay p { font-size: 16px; color: var(--gold-light); max-width: 480px; margin: 0 0 26px; }
      .hero-cta {
        background: var(--wine); color: #fff; border: 1px solid var(--gold);
        border-radius: 30px; padding: 13px 30px; font-size: 14px; letter-spacing: 0.5px;
      }
      .hero-cta:hover { background: var(--wine-dark); color: var(--ivory); }
      @media (max-width: 560px) {
        .hero-overlay h1 { font-size: 30px; }
      }
      @media (max-width: 768px), (hover: none) {
        /* background-attachment: fixed is unreliable on many mobile browsers —
           fall back to a normal scrolling background there instead of a
           janky/broken one. */
        .hero-banner { background-attachment: scroll; height: 88vh; }
      }

      /* value props */
      .value-props-section { margin-bottom: 50px; }
      .value-props-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
      .value-prop { text-align: center; padding: 10px 14px; }
      .value-prop-icon {
        width: 48px; height: 48px; border-radius: 50%; background: var(--gold-light); color: var(--wine);
        display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
      }
      .value-prop h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--wine-dark); margin: 0 0 6px; }
      .value-prop p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; }

      /* process / how it works */
      .process-section { text-align: center; margin-bottom: 50px; }
      .process-section h2 { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 32px; color: var(--ink); }
      .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 10px; }
      .process-step {
        position: relative; border: 1px solid var(--gold); border-radius: 4px; padding: 28px 18px 20px; background: var(--surface);
      }
      .process-step-number {
        position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
        width: 28px; height: 28px; border-radius: 50%; background: var(--wine); color: #fff;
        display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;
        border: 2px solid var(--ivory);
      }
      .process-step-icon { color: var(--gold); margin: 6px 0 10px; display: flex; justify-content: center; }
      .process-step h3 { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: var(--wine-dark); margin: 0 0 8px; }
      .process-step p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; }

      /* inspiration row */
      .inspiration-section { text-align: center; margin-bottom: 50px; }
      .inspiration-section h2 { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 32px; color: var(--ink); }
      .inspiration-sub { font-size: 14px; color: var(--muted); margin: 4px 0 24px; }
      .inspiration-row {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 26px 22px; margin-bottom: 22px;
      }
      .inspiration-item {
        display: flex; flex-direction: column; align-items: center; gap: 8px; width: 84px;
      }
      .inspiration-thumb {
        width: 84px; height: 84px; border-radius: 50%; overflow: hidden;
        border: 2px solid var(--gold); background: var(--ivory);
        display: flex; align-items: center; justify-content: center;
      }
      .inspiration-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .inspiration-more { background: var(--wine); color: #fff; border-color: var(--wine); }
      .inspiration-item span { font-size: 12.5px; color: var(--charcoal); }
      .inspiration-view-all {
        display: inline-flex; align-items: center; gap: 6px;
        border: 1px solid var(--wine); color: var(--wine); border-radius: 30px;
        padding: 10px 22px; font-size: 13px; font-weight: 600;
      }
      .inspiration-view-all:hover { background: var(--wine); color: #fff; }
      .inspiration-view-all-icon { margin-top: 1px; }

      /* faq */
      .faq-section { max-width: 680px; margin: 0 auto 50px; text-align: center; }
      .faq-section h2 { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 32px; color: var(--ink); }
      .faq-list { text-align: left; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
      .faq-item { border: 1px solid var(--gold); border-radius: 4px; background: var(--surface); overflow: hidden; }
      .faq-question {
        width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;
        padding: 14px 18px; font-size: 14.5px; color: var(--charcoal); text-align: left;
      }
      .faq-chevron { color: var(--gold); flex-shrink: 0; transition: transform 0.2s ease; }
      .faq-item.open .faq-chevron { transform: rotate(180deg); }
      .faq-answer { padding: 0 18px 16px; font-size: 14px; line-height: 1.7; color: var(--muted); margin: 0; }

      /* section bands (full-bleed colored zones with a wave top edge) */
      .section-band-outer {
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        margin-bottom: 50px;
      }
      .band-wave { display: block; width: 100%; height: 50px; margin-bottom: -2px; }
      .section-band { position: relative; overflow: hidden; padding: 56px 24px; }
      .section-band-inner { max-width: 1040px; margin: 0 auto; position: relative; z-index: 1; }
      .band-bg-image {
        position: absolute; inset: 0; background-size: cover; opacity: 0.16;
        pointer-events: none; z-index: 0; mix-blend-mode: multiply;
      }
      .band-bg-right { background-position: right center; }
      .band-bg-left { background-position: left center; }

      .intro-section { max-width: 680px; margin: 0 auto 40px; text-align: center; }
      .intro-section p { font-size: 17px; line-height: 1.8; color: var(--charcoal); margin: 0 0 16px; }
      .intro-section p:last-child { margin-bottom: 0; }

      .quote-feature-band {
        position: relative; overflow: hidden;
        background-size: cover; background-position: center;
        padding: 90px 24px; text-align: center;
      }
      .quote-feature-overlay {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse at center, rgba(58,15,28,0.55) 0%, rgba(29,7,14,0.82) 82%);
        pointer-events: none; z-index: 0;
      }
      .quote-feature-text {
        position: relative; z-index: 1;
        font-family: 'Cormorant Garamond', serif; font-size: 26px; font-style: italic;
        color: #F8EFDD; max-width: 640px; margin: 0 auto; line-height: 1.7;
      }
      @media (max-width: 640px) {
        .quote-feature-band { padding: 60px 20px; }
        .quote-feature-text { font-size: 21px; }
      }

      .corner-flourish { position: absolute; width: 30px; height: 30px; color: var(--gold); opacity: 0.75; z-index: 1; }
      .corner-flourish-tl { top: 6px; left: 6px; }
      .corner-flourish-tr { top: 6px; right: 6px; transform: scaleX(-1); }
      .corner-flourish-bl { bottom: 6px; left: 6px; transform: scaleY(-1); }
      .corner-flourish-br { bottom: 6px; right: 6px; transform: scale(-1, -1); }

      /* page-level backdrops (About / Contact) — real background photo,
         its own top/bottom mandala corners carry the motif so the
         middle stays clear for the content card */
      .about-page, .contact-page {
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: top center;
        padding-bottom: 60px;
      }

      /* category page hero band (real archway background image) */
      .category-hero-band {
        position: relative; overflow: hidden; text-align: center;
        background-size: cover; background-position: center;
        border-radius: 0 0 36px 36px;
        padding: 46px 24px 38px; margin: 0 0 30px;
      }
      .category-hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(58,15,20,0.35) 0%, rgba(58,15,20,0.6) 100%);
        pointer-events: none; z-index: 0;
      }
      .category-hero-band h1 { color: #FBF0DA; margin-bottom: 8px; position: relative; z-index: 1; }
      .category-hero-band .category-tagline { color: rgba(251,240,218,0.88); margin: 0; position: relative; z-index: 1; }

      .story-section { display: flex; flex-direction: column; gap: 30px; margin-bottom: 50px; }
      .story-block {
        display: flex; align-items: center; gap: 30px;
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
      }
      .story-block.reverse { flex-direction: row-reverse; }
      .story-media { flex: 1; min-width: 0; }
      .story-media img { width: 100%; height: 280px; object-fit: cover; display: block; }
      .story-text { flex: 1; min-width: 0; padding: 20px 30px; }
      .story-text p { font-size: 15px; line-height: 1.8; color: var(--charcoal); }
      @media (max-width: 700px) {
        .story-block, .story-block.reverse { flex-direction: column; }
        .story-media img { height: 220px; }
      }

      .categories-section, .services-section, .trust-section { text-align: center; margin-bottom: 50px; }
      .categories-section h2, .services-section h2 {
        font-family: 'Playfair Display', serif; font-weight: 800; font-size: 32px; color: var(--ink);
      }
      .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-top: 10px; }
      .category-card {
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
        text-align: left;
      }
      .category-card:hover { border-color: var(--wine); }
      .category-card-img { height: 180px; overflow: hidden; }
      .category-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .category-card-label {
        padding: 14px; font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--wine-dark); text-align: center;
        border-top: 1px solid var(--gold-light);
      }

      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 10px; }
      .service-card {
        border: 1px solid var(--gold); border-radius: 4px; padding: 24px 18px; background: var(--surface);
        position: relative;
      }
      .service-card::before {
        content: ''; position: absolute; inset: 5px; border: 1px solid var(--gold-light); border-radius: 2px; pointer-events: none;
      }
      .service-icon {
        width: 44px; height: 44px; border-radius: 50%; background: var(--gold-light); color: var(--wine);
        display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; position: relative;
      }
      .service-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--wine-dark); margin: 0 0 8px; position: relative; }
      .service-card p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; position: relative; }

      .trust-section p { max-width: 640px; margin: 0 auto 14px; font-size: 15px; line-height: 1.8; color: var(--charcoal); font-style: italic; }
      .trust-section p:last-child { margin-bottom: 0; }

      /* footer (real peacock artwork background) */
      .site-footer {
        position: relative; overflow: hidden;
        background-size: cover; background-position: center;
        border-top: 3px double var(--gold); padding: 30px 24px 100px; text-align: center;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
      }
      .footer-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(31,9,15,0.35) 0%, rgba(31,9,15,0.65) 100%);
        pointer-events: none; z-index: 0;
      }
      .footer-row, .site-footer > .ornament { position: relative; z-index: 1; }
      .site-footer .ornament::before, .site-footer .ornament::after { background: var(--gold-light); }
      .site-footer .ornament > .diamond { background: var(--gold-light); }
      .footer-row { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--gold-light); }
      .footer-row a { color: #fff; }
      .site-footer .muted { color: rgba(243,226,196,0.75); }
      .muted { color: var(--muted); font-style: italic; }

      /* content card (about/contact) */
      .content-card {
        position: relative; overflow: hidden;
        max-width: 640px; margin: 20px auto 0; background: var(--surface);
        border: 3px double var(--gold); border-radius: 2px; padding: 30px 36px;
      }
      .content-card p { font-size: 15.5px; line-height: 1.8; color: var(--charcoal); margin: 0 0 14px; }
      .content-card p:last-child { margin-bottom: 0; }
      .contact-card { display: flex; flex-direction: column; gap: 16px; align-items: center; }
      .contact-row { display: flex; align-items: center; gap: 10px; font-size: 16px; }

      /* category page */
      .category-tagline { text-align: center; color: var(--muted); font-size: 14px; margin: 0; }

      .venue-list-vertical { display: flex; flex-direction: column; gap: 20px; max-width: 480px; }
      .venue-row-card {
        display: flex; flex-direction: column; text-align: left;
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
      }
      .venue-row-card:hover { border-color: var(--wine); }
      .venue-photo-wrap { position: relative; width: 100%; height: 220px; }
      .venue-photo-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .venue-rating-badge {
        position: absolute; top: 10px; right: 10px;
        background: rgba(36,29,26,0.72); color: var(--gold-light);
        border-radius: 20px; padding: 4px 10px; font-size: 12px;
        display: flex; align-items: center; gap: 4px;
      }
      .venue-price-badge {
        position: absolute; bottom: 10px; right: 10px;
        background: var(--wine); color: #fff;
        border-radius: 20px; padding: 4px 12px; font-size: 12px;
      }
      .venue-row-name {
        padding: 14px 16px; font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--wine-dark);
      }

      /* venue detail page */
      .venue-page { text-align: center; }
      .venue-rating-line {
        display: inline-flex; align-items: center; gap: 5px; color: var(--gold);
        font-size: 13px; margin-bottom: 20px;
      }
      .venue-detail-card { text-align: left; padding: 20px; }
      .venue-slider { display: flex; flex-direction: column; gap: 10px; }
      .venue-slider-frame { width: 100%; border-radius: 6px; overflow: hidden; background: var(--ivory); }
      .venue-slider-frame img, .venue-slider-frame video { width: 100%; max-height: 440px; object-fit: cover; display: block; }
      .venue-slider-dots { display: flex; justify-content: center; gap: 6px; }
      .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); cursor: pointer; }
      .dot.active { background: var(--wine); }
      .no-media { padding: 60px 20px; text-align: center; color: var(--muted); border: 1px dashed var(--border); border-radius: 6px; }
      .venue-detail-info { margin-top: 18px; }
      .venue-price-line {
        display: inline-block; background: var(--gold-light); color: var(--wine-dark);
        border-radius: 20px; padding: 5px 16px; font-size: 14px; margin-bottom: 14px; font-weight: 500;
      }
      .venue-detail-info p { font-size: 15px; line-height: 1.8; color: var(--charcoal); }

      /* floating CTA + quote modal */
      .floating-cta {
        position: fixed; bottom: 22px; left: 0; right: 0; margin: 0 auto;
        width: fit-content; max-width: calc(100vw - 40px);
        background-color: #8A1F38;
        color: #ffffff;
        border: 1px solid #B8935A;
        border-radius: 30px;
        padding: 15px 28px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35); z-index: 200;
      }
      .floating-cta:hover { background-color: #4A1220; }

      .quote-modal-backdrop {
        position: fixed; inset: 0; background: rgba(33,26,23,0.55);
        display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 300;
      }
      .quote-modal {
        position: relative; background: var(--surface); border-radius: 12px;
        max-width: 420px; width: 100%; padding: 34px 30px 28px;
        text-align: center; max-height: 90vh; overflow-y: auto;
        box-shadow: 0 24px 60px rgba(33,26,23,0.25);
        border-top: 3px solid var(--gold);
      }
      .quote-modal-close {
        position: absolute; top: 14px; right: 14px; color: var(--muted);
        width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      }
      .quote-modal-close:hover { color: var(--wine); }
      .quote-back {
        position: absolute; top: 16px; left: 16px; color: var(--charcoal);
        width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      }
      .quote-modal h2 {
        font-family: 'Playfair Display', serif; font-weight: 700; font-size: 21px; color: var(--wine-dark);
        margin: 6px 0 8px;
      }
      .quote-modal-sub { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin: 0 0 20px; }
      .quote-demo-note {
        font-size: 12px; color: var(--wine); background: var(--gold-light); border-radius: 6px;
        padding: 8px 12px; margin: 0 0 18px; line-height: 1.5;
      }
      .quote-input {
        width: 100%; background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 13px 14px; font-size: 14px; color: var(--charcoal); margin-bottom: 12px;
      }
      .quote-input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(184,147,90,0.15); }
      .quote-phone-row { display: flex; gap: 8px; }
      .quote-phone-prefix {
        display: flex; align-items: center; justify-content: center;
        background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 0 14px; font-size: 14px; color: var(--charcoal);
      }
      .quote-phone-input { flex: 1; }

      .quote-select-wrap { position: relative; margin-bottom: 12px; }
      .quote-select-trigger {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 13px 14px; font-size: 14px; color: var(--charcoal); text-align: left;
        transition: border-color 0.15s ease;
      }
      .quote-select-trigger.open { border-color: var(--gold); }
      .quote-select-placeholder { color: var(--muted); }
      .quote-select-chevron { color: var(--muted); transition: transform 0.15s ease; flex-shrink: 0; margin-left: 8px; }
      .quote-select-chevron.open { transform: rotate(180deg); }
      .quote-select-panel {
        position: absolute; top: calc(100% + 6px); left: 0; right: 0;
        background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
        box-shadow: 0 14px 34px rgba(33,26,23,0.18);
        padding: 6px; z-index: 5; text-align: left;
        max-height: 200px; overflow-y: auto;
      }
      .quote-select-option {
        width: 100%; text-align: left; padding: 11px 12px; border-radius: 6px;
        font-size: 14px; color: var(--charcoal);
      }
      .quote-select-option:hover { background: var(--gold-light); }
      .quote-select-option.selected { background: var(--wine); color: #fff; }

      .quote-otp-note { font-size: 12.5px; color: var(--muted); margin: 4px 0 18px; }
      .quote-submit {
        width: 100%; border: none; border-radius: 30px; padding: 14px;
        font-size: 14.5px; font-weight: 600; color: #fff; background: #b9b0a8;
        transition: box-shadow 0.2s ease;
      }
      .quote-submit.ready { background: linear-gradient(135deg, #A62A48, var(--wine)); box-shadow: 0 8px 22px rgba(138,31,56,0.35); }
      .quote-submit.ready:hover { background: var(--wine-dark); }
      .quote-submit:disabled { cursor: not-allowed; }

      .quote-otp-boxes { display: flex; justify-content: center; gap: 12px; margin: 6px 0 14px; }
      .quote-otp-box {
        width: 48px; height: 54px; text-align: center; font-size: 20px;
        border: 1px solid var(--border); border-radius: 8px; background: var(--ivory); color: var(--charcoal);
      }
      .quote-otp-box:focus { outline: none; border-color: var(--wine); }
      .quote-otp-error { color: var(--wine); font-size: 13px; margin: 0 0 12px; }
      .quote-resend { font-size: 13px; color: var(--muted); margin: 0 0 18px; }
      .quote-resend-link { color: var(--wine); font-weight: 500; }
      .quote-resend-link:hover { text-decoration: underline; }

      .quote-thanks { padding: 10px 0 4px; }
      .quote-thanks-icon { color: var(--wine); margin-bottom: 12px; }
      .quote-thanks h2 { font-size: 20px; margin-bottom: 10px; }
      .quote-thanks p { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 22px; }

      .quote-modal-brand {
        margin-top: 22px; font-family: 'Cormorant Garamond', serif; font-weight: 700;
        letter-spacing: 1.5px; font-size: 13px; color: var(--gold);
      }

      @media (max-width: 560px) {
        .site-header { padding: 18px 20px; }
        .brand-name { font-size: 22px; }
        .site-main { padding: 30px 16px 40px; }
        .floating-cta { padding: 13px 22px; font-size: 13px; bottom: 16px; }
      }
    `}</style>
  );
}
